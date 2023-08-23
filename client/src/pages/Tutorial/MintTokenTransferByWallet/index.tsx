import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import MintToken from "./MintToken";
import TransferToken from "./TransferToken";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface Props {}
const MintTokenTransfer: React.FC<Props> = () => {
    // Step 1 连接到Solana网络 devnet
    const { connection } = useConnection();

    // Step 2 创建者账号信息（private key）
    const { publicKey: pubkey, sendTransaction } = useWallet();

    return (
        <>
            <Stack
                justifyContent="center"
                spacing={5}
                alignItems="center"
                sx={{ background: "#fff" }}
                p={3}>
                <Typography variant="h2">Mint Token and Transfer</Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        flexFlow: "row nowrap",
                    }}>
                    <MintToken
                        pubkey={pubkey}
                        sendTransaction={sendTransaction}
                        connection={connection}
                    />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <TransferToken
                        pubkey={pubkey}
                        sendTransaction={sendTransaction}
                        connection={connection}
                    />
                </Box>
            </Stack>
        </>
    );
};
export default MintTokenTransfer;
