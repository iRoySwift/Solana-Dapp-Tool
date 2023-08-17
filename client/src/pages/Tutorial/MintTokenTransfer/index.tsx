import React from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import MintToken from "./MintToken";
import TransferToken from "./TransferToken";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";

// keypair
const secretKeyArray = JSON.parse(
    process.env.REACT_APP_PRIVATE_KEY || "[]"
) as number[];

interface Props {}
const MintTokenTransfer: React.FC<Props> = () => {
    // Step 1 连接到Solana网络 devnet
    const devnet = clusterApiUrl("devnet");
    const connection = new Connection(devnet, "confirmed");

    // Step 2 创建者账号信息（private key）
    const signer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));
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
                    <MintToken signer={signer} connection={connection} />
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <TransferToken signer={signer} connection={connection} />
                </Box>
            </Stack>
        </>
    );
};
export default MintTokenTransfer;
