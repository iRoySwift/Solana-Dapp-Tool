'use client';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import useCheckWallet from '@/hooks/useCheckWallet';
import { cn } from '@/lib/utils';
import { useSolanaStore } from '@/store';
import { createAndSendV0TxByWallet } from '@/utils/solana/sendTransaction';
import { validateSolAddress } from '@/utils/solana/valid';
import { zodResolver } from '@hookform/resolvers/zod';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from '@solana/web3.js';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z
  .object({
    toPubkey: z
      .string({
        required_error: 'address is required',
      })
      .min(2, {
        message: 'address is invalid',
      }),
    count: z
      .number({
        required_error: 'Quantity is required',
      })
      .or(z.string().transform(Number))
      .refine((n) => n > 0, {
        message: 'cannot be less than 0',
      }),
  })
  .refine((data) => validateSolAddress(data.toPubkey), {
    message: 'address is not in the correct format',
    path: ['toPubkey'],
  });

interface Props {}
const BaseTransfer: React.FC<Props> = () => {
  const { connection } = useConnection();
  const { publicKey: pubkey, sendTransaction } = useWallet();
  const { cluster } = useSolanaStore();
  const [balance, setBalance] = useState(0);
  const { toast } = useToast();
  const checkWallet = useCheckWallet(pubkey);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      toPubkey: '',
      count: 0,
    },
  });
  const errors = form.formState.errors;

  const handleQuery = checkWallet(async () => {
    if (!pubkey) return;
    let balance = await connection.getBalance(pubkey);
    setBalance(balance / LAMPORTS_PER_SOL);
  });

  const goToSolanaExplorer = (txid?: string) => {
    window.open(`https://explorer.solana.com/tx/${txid}?cluster=${cluster}`);
  };
  const onSubmit = checkWallet(async () => {
    if (!pubkey) return;
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
      txInstruction,
    );
    toast({
      title: ' Transaction succesfully confirmed!',
      description: `Transaction:${txid}`,
      variant: 'success',
      action: (
        <ToastAction
          altText="Goto solana explorer"
          onClick={() => goToSolanaExplorer(txid)}
        >
          Lookup Detail
        </ToastAction>
      ),
    });
  });
  return (
    <div className="p-4">
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Transfer Solana
        </h2>
        <section className="mt-10 flex flex-col gap-5">
          <div>
            Balance:{balance}
            <Button className="ml-2" onClick={handleQuery}>
              Query
            </Button>
          </div>
          <Form {...form}>
            <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="toPubkey"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      className={cn('w-40  focus-visible:ring-offset-0', {
                        'border-destructive placeholder:text-destructive focus-visible:ring-destructive':
                          errors.toPubkey,
                      })}
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
                      className={cn('w-20  focus-visible:ring-offset-0', {
                        'border-destructive placeholder:text-destructive focus-visible:ring-destructive':
                          errors.toPubkey,
                      })}
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
        </section>
      </div>
    </div>
  );
};
export default BaseTransfer;
