"use client";
import {
  createMetadataInstruction,
  createTokenInstructions,
} from "@/utils/solana/mintToken";
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
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Keypair,
  ComputeBudgetProgram,
  Transaction,
} from "@solana/web3.js";
import React, { useState } from "react";
import WalletButton from "../wallet/WalletButton";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { validateSolAddress } from "@/utils/solana/valid";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";
import { getAssociatedTokenAddress } from "@solana/spl-token";

interface Props {}
const CreateToken: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const [mint, setMint] = useState<PublicKey>();
  const [tokenBalance, setTokenBalance] = useState<number | null>();
  let [tokenATA, setTokenATA] = useState<PublicKey>();

  const { $t } = useI18nStore();

  const FormSchema = z.object({
    tokenName: z
      .string({
        required_error: $t("tools.address-is-required"),
      })
      .min(1, {
        message: $t("tools.address-is-invalid"),
      }),
    symbol: z
      .string({
        required_error: $t("tools.address-is-required"),
      })
      .min(1, {
        message: $t("tools.address-is-invalid"),
      }),
    metadataUri: z
      .string({
        required_error: $t("tools.address-is-required"),
      })
      .min(2, {
        message: $t("tools.address-is-invalid"),
      }),
    supply: z
      .number({
        required_error: $t("tools.transfer-quantity-is-required"),
      })
      .or(z.string().transform(Number))
      .refine(n => n > 0, {
        message: $t("tools.transfer-quantity-must-be-greater-than-0"),
      }),
    decimals: z
      .number({
        required_error: $t("tools.transfer-quantity-is-required"),
      })
      .or(z.string().transform(Number))
      .refine(n => n > 0, {
        message: $t("tools.transfer-quantity-must-be-greater-than-0"),
      }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tokenName: "",
      symbol: "",
      metadataUri: "",
      supply: 1000000,
      decimals: 9,
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
    const mintKeypair = Keypair.generate();
    setMint(mintKeypair.publicKey);
    const instructions = await createTokenInstructions(
      connection,
      pubkey,
      mintKeypair.publicKey,
      form.getValues().supply,
      form.getValues().decimals
    );
    const metaInstructions = createMetadataInstruction(
      pubkey,
      mintKeypair.publicKey,
      form.getValues().tokenName,
      form.getValues().symbol,
      form.getValues().metadataUri
    );
    // let ix = new Transaction().add(...instructions, metaInstructions);
    // let txid = await sendTransaction(ix, connection, {
    //   signers: [mintKeypair],
    // });
    const txid = await createAndSendV0TxByWallet(
      pubkey,
      connection,
      sendTransaction,
      [...instructions, metaInstructions],
      [mintKeypair]
    );

    toast.success("Transaction succesfully confirmed!", {
      description: `Transaction:${txid}`,
      action: {
        label: $t("common.view"),
        onClick: () => goToSolanaExplorer(txid),
      },
    });
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
        <CardTitle>{$t("tools.create-token")}</CardTitle>
        <CardDescription>{$t("tools.create-token-desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
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
            <FormField
              control={form.control}
              name="supply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.supply")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.supply-desc")}
                      type="number"
                      step={0.01}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="decimals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{$t("tools.decimals")}:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={$t("tools.decimals-desc")}
                      type="number"
                      step={1}
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
                  {$t("tools.token-pubkey")}:{mint?.toString()}
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
export default CreateToken;
