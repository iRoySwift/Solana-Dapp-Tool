"use client";
import { createToken, mintToken } from "@/utils/solana/mintToken";
import { useForm } from "@iroy/hooks/react-hook-form";
import { getI18n } from "@iroy/i18n";
import { Lang } from "@iroy/i18n/config";
import { useI18nStore } from "@iroy/i18n/store";
import { toast } from "@iroy/ui";
import { Button } from "@iroy/ui/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@iroy/ui/components/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@iroy/ui/components/form";
import { Input } from "@iroy/ui/components/input";
import { Label } from "@iroy/ui/components/label";
import { z, zodResolver } from "@iroy/ui/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import React, { useState } from "react";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { validateSolAddress } from "@/utils/solana/valid";

interface Props {}
const TransferToken: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const [mint, setMint] = useState<PublicKey>();
  const [balance, setBalance] = useState<number | null>();
  let [ata, setAta] = useState<PublicKey>();

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

  const goToSolanaExplorer = (txid?: string) => {
    window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
  };

  const handleCreateToken = async () => {
    if (!pubkey) {
      toast.warning($t("tools.please-connect-your-wallet"));
      return;
    }
    const mint = await createToken(connection, pubkey, sendTransaction);
    setMint(mint);
    console.log(`   ✅ - Token mint address: ${mint.toBase58()}`);
  };

  const onSubmit = async () => {
    if (!pubkey) return;
    if (!mint) return;
    const { ata, txid } = await mintToken(
      connection,
      pubkey,
      mint,
      new PublicKey(form.getValues().toPubkey),
      form.getValues().amount * LAMPORTS_PER_SOL,
      sendTransaction
    );
    setAta(ata);
    toast.success("Transaction succesfully confirmed!", {
      description: `Transaction:${txid}`,
      action: {
        label: $t("common.view"),
        onClick: () => goToSolanaExplorer(txid),
      },
    });
  };

  const handleQuery = async () => {
    if (!ata) {
      toast.warning("Unable to obtain ATA account for Token!");
      return;
    }
    let balance = await connection.getTokenAccountBalance(ata);
    setBalance(balance.value.uiAmount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{$t("tools.transfer-token")}</CardTitle>
        <CardDescription>
          {$t("tools.transfer-token-to-other-address")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="grid items-center gap-2">
              <div>
                <Label>Token address:</Label>
              </div>
              <p className="text-muted-foreground flex text-sm">
                {mint ? (
                  <div>{mint?.toBase58()}</div>
                ) : (
                  <Button size="sm" type="button" onClick={handleCreateToken}>
                    Create Token
                  </Button>
                )}
              </p>
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
            <div className="grid items-center gap-2">
              <div>
                <Label>查询接收钱包Token balance:</Label>
              </div>
              <p className="text-muted-foreground flex text-sm">
                {balance ? (
                  <div>{balance}</div>
                ) : (
                  <Button size="sm" type="button" onClick={handleQuery}>
                    Query Token
                  </Button>
                )}
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default TransferToken;
