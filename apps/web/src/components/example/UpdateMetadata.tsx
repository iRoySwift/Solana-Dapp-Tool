"use client";
import { updateMetadataInstruction } from "@/utils/solana/mintToken";
import { useForm } from "@iroy/hooks/react-hook-form";
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
import { z, zodResolver } from "@iroy/ui/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React from "react";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";

interface Props {}
const UpdateMetadata: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const { $t } = useI18nStore();

  const FormSchema = z.object({
    tokenMint: z
      .string({
        required_error: $t("tools.address-is-required"),
      })
      .min(1, {
        message: $t("tools.address-is-invalid"),
      }),
    tokenName: z.string({
      required_error: $t("tools.name-is-required"),
    }),
    symbol: z.string({
      required_error: $t("tools.name-is-required"),
    }),
    metadataUri: z.string({
      required_error: $t("tools.address-is-required"),
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokenMint: "",
      tokenName: "",
      symbol: "",
      metadataUri: "",
    },
  });

  const goToSolanaExplorer = (txid?: string) => {
    window.open(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
  };

  const onSubmit = async () => {
    if (!pubkey) {
      toast.warning($t("tools.please-connect-your-wallet"));
      return;
    }
    const metaInstructions = updateMetadataInstruction(
      pubkey,
      new PublicKey(form.getValues().tokenMint),
      form.getValues().tokenName,
      form.getValues().symbol,
      form.getValues().metadataUri
    );

    const txid = await createAndSendV0TxByWallet(
      pubkey,
      connection,
      sendTransaction,
      [metaInstructions]
    );

    toast.success("Transaction succesfully confirmed!", {
      description: `Transaction:${txid}`,
      action: {
        label: $t("common.view"),
        onClick: () => goToSolanaExplorer(txid),
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
          {$t("tools.update-metadata")}
        </CardTitle>
        <CardDescription>{$t("tools.update-metadata-desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="tokenMint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.token-mint-address")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.token-mint-address")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tokenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.token-name")}:</FormLabel>
                  <FormControl>
                    <Input placeholder={$t("tools.token-name")} {...field} />
                  </FormControl>
                  <FormDescription>
                    {$t("tools.token-name-desc")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="symbol"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.symbol")}:</FormLabel>
                  <FormControl>
                    <Input placeholder={$t("tools.symbol-desc")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metadataUri"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.metadata-uri")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.metadata-uri-desc")}
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
export default UpdateMetadata;
