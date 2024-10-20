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

interface Props {}
const Home: React.FC<Props> = () => {
    const { connection } = useConnection();
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const { cluster } = useSolanaStore();
    const [balance, setBalance] = useState(0);
    const { toast } = useToast();
    const checkWallet = useCheckWallet(pubkey);

    const handleQuery = checkWallet(async () => {
        if (!pubkey) return;
        let balance = await connection.getBalance(pubkey);
        console.log("🚀 ~ handleQuery ~ balance:", balance);
        setBalance(balance / LAMPORTS_PER_SOL);
    });

    return (
        <div className="flex size-full flex-col gap-5">
            <Button onClick={handleQuery}>Test</Button>
            <Balances />
            <Assets />
        </div>
    );
};
export default Home;
