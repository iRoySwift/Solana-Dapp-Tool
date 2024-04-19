"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useCheckWallet from "@/hooks/useCheckWallet";
import { cn } from "@/lib/utils";
import { useSolanaStore } from "@/store";
import { createToken, mintToken } from "@/utils/solana/mintToken";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";
import { validateSolAddress } from "@/utils/solana/valid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z
    .object({
        toPubkey: z
            .string({
                required_error: "address is required",
            })
            .min(2, {
                message: "address is invalid",
            }),
        count: z
            .number({
                required_error: "Quantity is required",
            })
            .or(z.string().transform(Number))
            .refine(n => n > 0, {
                message: "cannot be less than 0",
            }),
    })
    .refine(data => validateSolAddress(data.toPubkey), {
        message: "address is not in the correct format",
        path: ["toPubkey"],
    });

interface Props {}
const MintToken: React.FC<Props> = () => {
    const { connection } = useConnection();
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const { cluster } = useSolanaStore();
    const [mint, setMint] = useState<PublicKey>();
    let [ata, setAta] = useState<PublicKey>();
    const [balance, setBalance] = useState<number | null>();
    const { toast } = useToast();
    const checkWallet = useCheckWallet(pubkey);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            toPubkey: "",
            count: 0,
        },
    });
    const errors = form.formState.errors;

    const handleCreateToken = checkWallet(async () => {
        if (!pubkey) return;
        const mint = await createToken(connection, pubkey, sendTransaction);
        setMint(mint);
        console.log(`   ✅ - Token mint address: ${mint.toBase58()}`);
    });

    const goToSolanaExplorer = (txid?: string) => {
        window.open(
            `https://explorer.solana.com/tx/${txid}?cluster=${cluster}`
        );
    };
    const onSubmit = checkWallet(async () => {
        if (!pubkey) return;
        if (!mint) return;
        const { ata, txid } = await mintToken(
            connection,
            pubkey,
            mint,
            new PublicKey(form.getValues().toPubkey),
            form.getValues().count * LAMPORTS_PER_SOL,
            sendTransaction
        );
        setAta(ata);
        toast({
            title: "Transaction succesfully confirmed!",
            description: `Transaction:${txid}`,
            variant: "success",
            action: (
                <ToastAction
                    altText="Goto solana explorer"
                    onClick={() => goToSolanaExplorer(txid)}>
                    Lookup Detail
                </ToastAction>
            ),
        });
    });

    const handleQuery = async () => {
        if (!ata)
            return toast({
                title: "Unable to obtain ATA account for Token!",
                variant: "warning",
            });
        let balance = await connection.getTokenAccountBalance(ata);
        setBalance(balance.value.uiAmount);
    };
    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    Mint Token
                </h2>
                <section className="mt-10 flex flex-col gap-5">
                    <a
                        className="cursor-pointer text-primary"
                        onClick={handleCreateToken}>
                        Create Token
                    </a>
                    <div>Token address:{mint?.toBase58()}</div>
                    <Form {...form}>
                        <form
                            className="flex gap-2"
                            onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="toPubkey"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            className={cn(
                                                "w-40  focus-visible:ring-offset-0",
                                                {
                                                    "border-destructive placeholder:text-destructive focus-visible:ring-destructive":
                                                        errors.toPubkey,
                                                }
                                            )}
                                            placeholder="Receiving address"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="count"
                                render={({ field }) => (
                                    <FormItem>
                                        <Input
                                            className={cn(
                                                "w-20  focus-visible:ring-offset-0",
                                                {
                                                    "border-destructive placeholder:text-destructive focus-visible:ring-destructive":
                                                        errors.count,
                                                }
                                            )}
                                            type="number"
                                            step={0.01}
                                            placeholder="Quantity"
                                            {...field}
                                        />
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Transfer</Button>
                        </form>
                    </Form>
                    <div className="flex items-center gap-5">
                        <span>Token balance:{balance}</span>
                        <Button onClick={handleQuery}>Query Token</Button>
                    </div>
                </section>
            </div>
        </div>
    );
};
export default MintToken;
