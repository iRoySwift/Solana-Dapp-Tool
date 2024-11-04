"use client";
import React, { useState } from "react";
import Assets from "./module/Assets";
import Balances from "./module/Balances";
import { useToast } from "@/components/ui/use-toast";
import useCheckWallet from "@/hooks/useCheckWallet";
import { useSolanaStore } from "@/store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { Button } from "@/components/ui/button";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

interface Props {}
const Home: React.FC<Props> = () => {
    const { connection } = useConnection();
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const { cluster } = useSolanaStore();
    const [balance, setBalance] = useState(0);
    const { toast } = useToast();
    const checkWallet = useCheckWallet(pubkey);

    /**
     * 查询sol余额
     */
    const handleQuery = checkWallet(async () => {
        if (!pubkey) return;
        let balance = await connection.getBalance(pubkey);
        setBalance(balance / LAMPORTS_PER_SOL);
    });

    /**
     * 查询钱包token列表
     */
    const queryTokenList = async () => {
        if (!pubkey) return;
        const result: any = await connection.getTokenAccountsByOwner(pubkey, {
            programId: TOKEN_PROGRAM_ID,
        });
        console.log("🚀 ~ queryTokenList ~ result:", result);
    };

    return (
        <div className="flex size-full flex-col gap-5">
            <Button onClick={queryTokenList}>Test</Button>
            <Balances />
            <Assets />
        </div>
    );
};
export default Home;
