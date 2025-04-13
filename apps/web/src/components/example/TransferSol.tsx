"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@iroy/ui/components/card";
import { Input } from "@iroy/ui/components/input";
import { Label } from "@iroy/ui/components/label";
import { Button } from "@iroy/ui/components/button";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { z, zodResolver } from "@iroy/ui/zod";
import { validateSolAddress } from "@/utils/solana/valid";
import { useForm } from "@iroy/hooks/react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@iroy/ui/components/form";
import { toast } from "@iroy/ui";
import { debounce } from "@iroy/utils/lodash-es";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";
import { useI18nStore } from "@iroy/i18n/store";

interface Props {}
const TransferSol: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const { $t } = useI18nStore();

  const FormSchema = z
    .object({
      toPubkey: z
        .string({
          required_error: $t("tools.address-is-required"),
        })
        .min(2, {
          message: $t("tools.address-is-invalid"),
        }),
      amount: z
        .number({
          required_error: $t("tools.transfer-quantity-is-required"),
        })
        .or(z.string().transform(Number))
        .refine(n => n > 0, {
          message: $t("tools.transfer-quantity-must-be-greater-than-0"),
        }),
    })
    .refine(data => validateSolAddress(data.toPubkey), {
      message: $t("tools.address-is-not-in-the-correct-format"),
      path: ["toPubkey"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      toPubkey: "",
      amount: 0,
    },
  });

  const handleAirdrop = useCallback(
    debounce(async () => {
      if (!pubkey) {
        toast.warning($t("tools.please-connect-your-wallet"));
        return;
      }
      const signature = await connection
        .requestAirdrop(pubkey, LAMPORTS_PER_SOL * 10)
        .catch(err => {
          toast.error($t("tools.airdrop-failed"));
        });

      signature && (await connection.confirmTransaction(signature));
      toast.success($t("tools.airdrop-success"));
    }, 300),
    [connection, pubkey]
  );

  const updateBalance = useCallback(
    debounce(async (pubkey: PublicKey | null) => {
      setBalance(0);
      if (!pubkey) return;
      try {
        connection.onAccountChange(
          pubkey,
          updatedAccountInfo => {
            setBalance(updatedAccountInfo.lamports / LAMPORTS_PER_SOL);
          },
          {
            commitment: "confirmed",
          }
        );

        const accountInfo = await connection.getAccountInfo(pubkey);

        if (accountInfo) {
          setBalance(accountInfo.lamports / LAMPORTS_PER_SOL);
        } else {
          throw new Error("Account info not found");
        }
      } catch (error) {
        console.error("Failed to retrieve account info:", error);
      }
    }, 300),
    [connection]
  );

  const goToSolanaExplorer = (txid?: string) => {
    window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!pubkey) return;
    const txInstruction = [
      SystemProgram.transfer({
        fromPubkey: pubkey,
        toPubkey: new PublicKey(form.getValues().toPubkey),
        lamports: form.getValues().amount * LAMPORTS_PER_SOL,
      }),
    ];
    const txid = await createAndSendV0TxByWallet(
      pubkey,
      connection,
      sendTransaction,
      txInstruction
    );
    toast.success($t("tools.you-submitted-the-following-values"), {
      description: (
        <pre className="mt-2 rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      action: {
        label: $t("common.view"),
        onClick: () => goToSolanaExplorer(txid),
      },
    });
  }

  useEffect(() => {
    updateBalance(pubkey);
  }, [pubkey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{$t("tools.transfer-sol")}</CardTitle>
        <CardDescription>{$t("tools.transfer-sol-desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid gap-2">
              <Label>{$t("tools.current-wallet-address")}:</Label>
              <p className="text-muted-foreground text-sm">
                {pubkey
                  ? new PublicKey(pubkey).toString()
                  : $t("tools.not-connected")}
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="balance">{$t("tools.sol-balance")}:</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="balance"
                  value={balance}
                  readOnly
                  placeholder={$t("tools.sol-balance")}
                />
                <Button type="button" onClick={handleAirdrop}>
                  {$t("tools.airdrop")}
                </Button>
              </div>
            </div>
            <FormField
              control={form.control}
              name="toPubkey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.receive-wallet-address")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.receive-wallet-address")}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {$t("tools.receive-wallet-address-desc")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.transfer-quantity")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.transfer-quantity")}
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {pubkey ? (
              <Button type="submit">{$t("common.submit")}</Button>
            ) : (
              <WalletButton>
                <Button type="button" className="w-full">
                  <WalletIcon /> {$t("common.connect-wallet")}
                </Button>
              </WalletButton>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default TransferSol;
