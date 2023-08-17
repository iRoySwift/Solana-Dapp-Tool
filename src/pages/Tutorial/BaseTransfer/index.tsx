import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Keypair,
    clusterApiUrl,
} from "@solana/web3.js";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { createAndSendV0Tx } from "@/utils/solana/sendTransaction";
import Loading from "@/components/Loading";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

// keypair
const secretKeyArray = JSON.parse(
    process.env.REACT_APP_PRIVATE_KEY || "[]"
) as number[];

// to 钱包地址
const TO_PUBLIC_KEY = new PublicKey(
    "Gir7LUMrsXHv5gGctKNp6th2Pj7j9qmYR1LSrsHS6Yaj"
);

interface Props {}
const BaseTransfer: React.FC<Props> = () => {
    const [balance, setBalance] = useState(0);
    const [toPubkey, setToPubkey] = useState(TO_PUBLIC_KEY);
    const [count, SetCount] = useState(0);
    const [loading, setLoading] = useState(false);

    // Step 1 连接到Solana网络 devnet
    const devnet = clusterApiUrl("devnet");
    const connection = new Connection(devnet, "confirmed");

    // Step 2 创建者账号信息（private key）
    const signer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

    const handleQueryWallet = async () => {
        if (!signer.publicKey) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        connection.getBalance(signer.publicKey).then(balance => {
            enqueueSnackbar(
                `${signer.publicKey} has a balance of ${
                    balance / LAMPORTS_PER_SOL
                }`,
                {
                    variant: "success",
                }
            );
            setBalance(balance);
        });
    };

    const handleReciveChange = v => {
        setToPubkey(new PublicKey(v.target.value));
    };
    const handleCountChange = v => {
        SetCount(v.target.value);
    };
    const handleTransfer = async () => {
        if (!signer) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        setLoading(true);
        console.log("   ✅ - Test v0 Transfer");

        // * Step 1 - create an array with your desires `instructions`
        // let minRent = await connection.getMinimumBalanceForRentExemption(0);
        const instructions = [
            SystemProgram.transfer({
                fromPubkey: signer.publicKey,
                toPubkey,
                lamports: count * LAMPORTS_PER_SOL,
            }),
        ];
        console.log(
            "   ✅ - Step 1 - create an array with your desires `instructions`"
        );

        // * Step 2 - Generate a transaction and send it to the network
        const txid = await createAndSendV0Tx(signer, connection, instructions);
        console.log(
            "   ✅ - Step 2 - Generate a transaction and send it to the network"
        );

        setLoading(false);

        enqueueSnackbar("🎉 Transaction succesfully confirmed!", {
            variant: "success",
        });
        enqueueSnackbar(
            `https://explorer.solana.com/tx/${txid}?cluster=devnet`,
            {
                variant: "success",
            }
        );
    };
    return (
        <>
            <Stack
                justifyContent="center"
                spacing={5}
                alignItems="center"
                marginTop={10}>
                <Typography variant="h1">Solana的Web3.js</Typography>
                <Item>
                    <Typography variant="h2">Transfer SOL</Typography>
                </Item>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">PublicKey:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${signer.publicKey}?cluster=devnet`}>
                        {`${signer.publicKey}`}
                    </Link>
                </Box>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5">Balance:</Typography>
                    <span>{balance / LAMPORTS_PER_SOL}</span>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleQueryWallet}>
                        Query
                    </Button>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <TextField
                        id="recived_address"
                        label="Recive Address"
                        variant="outlined"
                        value={toPubkey}
                        onChange={handleReciveChange}
                    />
                    <TextField
                        id="count"
                        label="Count"
                        variant="outlined"
                        type="number"
                        sx={{ minWidth: 100 }}
                        InputProps={{
                            inputProps: {
                                min: 0,
                                max: balance / LAMPORTS_PER_SOL,
                            },
                        }}
                        value={count}
                        onChange={handleCountChange}
                    />
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleTransfer}>
                        Transfer
                    </Button>
                </Stack>
                {loading && <Loading />}
            </Stack>
        </>
    );
};
export default BaseTransfer;
