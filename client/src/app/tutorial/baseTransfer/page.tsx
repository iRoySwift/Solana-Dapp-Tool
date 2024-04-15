"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSolanaStore } from "@/store";
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
                required_error: "接收地址必填",
            })
            .min(2, {
                message: "接收地址格式不正确",
            }),
        count: z
            .number({
                required_error: "数量必填",
            })
            .or(z.string().transform(Number))
            .refine(n => n > 0, {
                message: "数量不能少于0",
            }),
    })
    .refine(data => validateSolAddress(data.toPubkey), {
        message: "接收地址格式不正确",
        path: ["toPubkey"],
    });

interface Props {}
const BaseTransfer: React.FC<Props> = () => {
    const { connection } = useConnection();
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const { cluster } = useSolanaStore();
    const [balance, setBalance] = useState(0);
    const { toast } = useToast();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            toPubkey: "",
            count: 0,
        },
    });

    const handleQuery = async () => {
        if (!pubkey)
            return toast({ title: "请连接钱包！", variant: "warning" });
        let balance = await connection.getBalance(pubkey);
        setBalance(balance / LAMPORTS_PER_SOL);
    };

    const goToSolanaExplorer = (txid?: string) => {
        window.open(
            `https://explorer.solana.com/tx/${txid}?cluster=${cluster}`
        );
    };
    const onSubmit = async () => {
        if (!pubkey)
            return toast({ title: "请连接钱包！", variant: "warning" });
        if (!form.getValues().toPubkey)
            return toast({ title: "请输入接收地址", variant: "warning" });
        if (!form.getValues().count)
            return toast({ title: "请输入数量", variant: "warning" });
        const txInstruction = [
            SystemProgram.transfer({
                fromPubkey: pubkey,
                toPubkey: new PublicKey(form.getValues().toPubkey),
                lamports: form.getValues().count * LAMPORTS_PER_SOL,
            }),
        ];
        const txid = await createAndSendV0TxByWallet(
            pubkey,
            connection,
            sendTransaction,
            txInstruction
        );
        toast({
            title: " Transaction succesfully confirmed!",
            description: `Transaction:${txid}`,
            variant: "success",
            action: (
                <ToastAction
                    altText="Goto solana explorer"
                    onClick={() => goToSolanaExplorer(txid)}>
                    查看详情
                </ToastAction>
            ),
        });
    };
    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center gap-2">
                <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                    钱包转账
                </h2>
                <div>
                    余额：{balance}
                    <Button className="ml-2" onClick={handleQuery}>
                        查询
                    </Button>
                </div>
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
                                        className="w-40"
                                        placeholder="接收地址"
                                        // value={toPubkey?.toBase58()}
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
                                        className="w-20"
                                        type="number"
                                        step={0.01}
                                        placeholder="数量"
                                        {...field}
                                    />
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">转账</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};
export default BaseTransfer;
