import { Box, Divider, Stack, Typography } from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import React, { useState } from "react";
import TokenList, { type itokenItem } from "./TokenList";
import TransferToken from "./TransferToken";
import type { PublicKey } from "@solana/web3.js";
interface Props {}
const AirdropToken: React.FC<Props> = () => {
    // Step 1 连接到Solana网络 devnet
    const { connection } = useConnection();

    // Step 2 创建者账号信息（private key）
    const { publicKey: pubkey, sendTransaction } = useWallet();

    // 获取token info 和 destination list
    const [destinations, setDestinations] = useState<PublicKey[]>();
    const [selectToken, setSelectToken] = useState<itokenItem>();

    return (
        <Box sx={{ padding: 3, background: "#fff" }}>
            <Stack justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h2">一键发Token工具</Typography>
            </Stack>
            <Stack
                flexWrap={"nowrap"}
                flexDirection={"row"}
                width={"100%"}
                marginTop={10}>
                <TokenList
                    pubkey={pubkey}
                    sendTransaction={sendTransaction}
                    connection={connection}
                    setDestinations={setDestinations}
                    setSelectToken={setSelectToken}
                />
                <Divider orientation="vertical" variant="middle" flexItem />
                <TransferToken
                    pubkey={pubkey}
                    sendTransaction={sendTransaction}
                    connection={connection}
                    selectToken={selectToken}
                    destinations={destinations}
                />
            </Stack>
        </Box>
    );
};
export default AirdropToken;
