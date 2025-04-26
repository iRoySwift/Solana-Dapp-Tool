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
import { Form } from "@iroy/ui/components/form";
import { toast } from "@iroy/ui";
import { debounce } from "@iroy/utils/lodash-es";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { useI18nStore } from "@iroy/i18n/store";

interface Props {}
const AirdropToken: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const [balance, setBalance] = useState(0);
  const { $t } = useI18nStore();

  const FormSchema = z.object({});

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {},
  });

  const handleAirdrop = useCallback(
    debounce(async () => {
      if (!pubkey) {
        toast.warning($t("tools.please-connect-your-wallet"));
        return;
      }
      try {
        const signature = await connection
          .requestAirdrop(pubkey, LAMPORTS_PER_SOL * 5)
          .catch(err => {
            toast.error($t("tools.airdrop-failed"));
          });

        signature &&
          (await connection.confirmTransaction(signature).catch(err => {
            toast.error($t("tools.airdrop-failed"));
          }));
        signature && toast.success($t("tools.airdrop-success"));
      } catch {
        toast.error($t("tools.airdrop-failed"));
      }
    }, 300),
    [connection, pubkey]
  );

  const updateBalance = useCallback(
    debounce(async (pubkey: PublicKey | null) => {
      setBalance(0);
      if (!pubkey) {
        toast.warning($t("tools.please-connect-your-wallet"));
        return;
      }
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!pubkey) return;
    handleAirdrop();
  }

  useEffect(() => {
    updateBalance(pubkey);
  }, [pubkey]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{$t("tools.airdrop-sol")}</CardTitle>
        <CardDescription>{$t("tools.airdrop-sol-desc")}</CardDescription>
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
              </div>
            </div>
            {pubkey ? (
              <Button type="submit">{$t("tools.airdrop")}</Button>
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
export default AirdropToken;
