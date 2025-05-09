"use client";
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
import { Label } from "@iroy/ui/components/label";
import { z, zodResolver } from "@iroy/ui/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, Keypair } from "@solana/web3.js";
import React, { useState } from "react";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { Metadata, PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

interface Props {}
const GetTokenMetadata: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const [mint, setMint] = useState<PublicKey>();
  const [tokenBalance, setTokenBalance] = useState<number | null>();
  let [tokenATA, setTokenATA] = useState<PublicKey>();

  const { $t } = useI18nStore();

  const FormSchema = z.object({
    tokenMint: z
      .string({
        required_error: $t("tools.address-is-required"),
      })
      .min(1, {
        message: $t("tools.address-is-invalid"),
      }),
    tokenName: z.string(),
    symbol: z.string(),
    metadataUri: z.string(),
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

  const onSubmit = async () => {
    if (!pubkey) {
      toast.warning($t("tools.please-connect-your-wallet"));
      return;
    }
    const tokenMint = new PublicKey(form.getValues().tokenMint);
    setMint(tokenMint);
    const metadataPDA = PublicKey.findProgramAddressSync(
      [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), tokenMint.toBuffer()],
      PROGRAM_ID
    )[0];

    const metadataAccount = await connection.getAccountInfo(metadataPDA);
    if (metadataAccount?.data) {
      const [metadata, _] = await Metadata.deserialize(metadataAccount.data);
      console.log(metadata);
      form.setValue("tokenName", metadata.data.name);
      form.setValue("symbol", metadata.data.symbol);
      form.setValue("metadataUri", metadata.data.uri);
      toast.success("Metadata fetched successfully!");
    }
  };

  const handleQuery = async () => {
    if (!pubkey) {
      toast.warning($t("tools.please-connect-your-wallet"));
      return;
    }
    if (!mint) {
      toast.warning("Unable to obtain ATA account for Token!");
      return;
    }
    const tokenATA = await getAssociatedTokenAddress(mint, pubkey);
    setTokenATA(tokenATA);
    let balance = await connection.getTokenAccountBalance(tokenATA);
    setTokenBalance(balance.value.uiAmount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="bg-gradient-to-tr from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
          {$t("tools.get-metadata")}
        </CardTitle>
        <CardDescription>{$t("tools.get-metadata-desc")}</CardDescription>
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
                    <Input
                      readOnly
                      placeholder={$t("tools.token-name")}
                      {...field}
                    />
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
                    <Input
                      readOnly
                      placeholder={$t("tools.symbol-desc")}
                      {...field}
                    />
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
                      readOnly
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
            <div className="grid items-center gap-2">
              <div>
                <Label>
                  {$t("tools.token-pubkey")}:{tokenATA?.toString()}
                </Label>
              </div>
              <p className="text-muted-foreground flex text-sm">
                {tokenBalance ? (
                  <div>{tokenBalance}</div>
                ) : (
                  <Button size="sm" type="button" onClick={handleQuery}>
                    {$t("tools.lookup-balance")}
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
export default GetTokenMetadata;
