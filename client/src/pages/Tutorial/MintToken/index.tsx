import { AlertTip } from "@/pages/AirdropToken/TokenList";
import { createToken, mintToken } from "@/utils/solana";
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import Loading from "@/components/Loading";

interface Props {}

const MintToken: React.FC<Props> = () => {
    // Step 1 连接到Solana网络 devnet
    const { connection } = useConnection();

    // Step 2 创建者账号信息（private key）
    const { publicKey: pubkey, sendTransaction } = useWallet();

    const [loading, setLoading] = useState(false);
    let [mint, setMint] = useState<PublicKey>();
    let [ataAccount, setAtaAccount] = useState<PublicKey>();

    const [toPubkey, setToPubkey] = useState<PublicKey>();
    const [toCount, setToCount] = useState(1000000000);
    const [balance, setBalance] = useState<number | null>(0);

    const onToPublicKey = e => {
        setToPubkey(new PublicKey(e.target.value));
    };

    const onToCount = e => {
        setToCount(e.target.value * LAMPORTS_PER_SOL);
    };

    const onCreateToken = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);
        // 创建一个新的 mint （铸币）
        const mint: PublicKey = await createToken(
            connection,
            pubkey,
            sendTransaction
        );
        setMint(mint);
        console.log(`   ✅ - Token mint address: ${mint.toBase58()}`);

        setLoading(false);
        enqueueSnackbar("🎉 Mint Token succesfully!", {
            variant: "success",
        });
    };

    const onMint = async () => {
        if (!pubkey || !mint || !toPubkey) {
            enqueueSnackbar(`没有获取到pubkey、mint、toPubkey账号！`, {
                variant: "warning",
            });
            return;
        }
        const ata = await mintToken(
            connection,
            pubkey,
            mint,
            toPubkey,
            toCount,
            sendTransaction
        );
        setAtaAccount(ata);
    };
    const onBalance = () => {
        if (!ataAccount) {
            enqueueSnackbar(`没有获取到Token的ATA账号！`, {
                variant: "warning",
            });
            return;
        }
        connection.getTokenAccountBalance(ataAccount).then(balance => {
            console.log("balance:", balance);
            enqueueSnackbar(
                `${pubkey} has a balance of ${balance.value.uiAmount}`
            );
            setBalance(balance.value.uiAmount);
        });
    };
    return (
        <>
            <Stack
                justifyContent="center"
                spacing={5}
                alignItems="center"
                sx={{ background: "#fff" }}
                p={3}>
                <Typography variant="h2">Mint Token</Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center">
                    <Container>
                        <React.Fragment>
                            <Button onClick={onCreateToken}>
                                {" "}
                                CreateToken
                            </Button>
                        </React.Fragment>
                        <Box>Token:{`${mint || ""}`}</Box>
                        <br />
                        <React.Fragment>
                            <div>
                                <TextField
                                    label="To"
                                    onChange={onToPublicKey}
                                />
                                <TextField label="Count" onChange={onToCount} />
                                <Button onClick={onMint}> Mint </Button>
                            </div>
                        </React.Fragment>
                        <React.Fragment>
                            <span>Balance:{balance} </span>
                            <Button onClick={onBalance}> Query Balance </Button>
                        </React.Fragment>
                    </Container>
                </Stack>
            </Stack>
            {loading && <Loading />}
        </>
    );
};
export default MintToken;
