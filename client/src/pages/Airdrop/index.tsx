import { Box, Stack, Typography } from "@mui/material";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import React, { useState } from "react";

const MINT = new PublicKey("CQ68EPr2bHQ29bLZdHioLx5An35hfav1mqn36hG74ofH");

interface Props {}
const Airdrop: React.FC<Props> = () => {
    const [toPubkey, setToPubkey] = useState<PublicKey>();
    const [mintPubkey, setMintPubkey] = useState<PublicKey>(MINT);
    const [loading, setLoading] = useState(false);

    // Step 1 连接到Solana网络 devnet
    const { connection } = useConnection();

    // Step 2 创建者账号信息（private key）
    const { publicKey: pubkey, sendTransaction } = useWallet();

    const transferToken = () => {
        // 获取ATA账号
        getAssociatedTokenAddress(mintPubkey);
    };
    return (
        <Stack justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h2">一键发Token工具</Typography>
            <Box>ss</Box>
        </Stack>
    );
};
export default Airdrop;
