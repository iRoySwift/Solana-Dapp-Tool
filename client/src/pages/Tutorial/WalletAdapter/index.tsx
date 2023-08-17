import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
    Box,
    Button,
    Link,
    Stack,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

// to 钱包地址
const TO_PUBLIC_KEY = new PublicKey(
    "Gir7LUMrsXHv5gGctKNp6th2Pj7j9qmYR1LSrsHS6Yaj"
);

interface Props {}
const WalletAdapter: React.FC<Props> = () => {
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const { connection } = useConnection();
    const [balance, setBalance] = useState(0);
    const [toPubkey, setToPubkey] = useState(TO_PUBLIC_KEY);
    const [count, SetCount] = useState(0);

    const handleQueryWallet = async () => {
        if (!pubkey) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        connection.getBalance(pubkey).then(balance => {
            enqueueSnackbar(
                `${pubkey} has a balance of ${balance / LAMPORTS_PER_SOL}`,
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
        if (!pubkey) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        // * Step 1 - create an array with your desires `instructions`
        // let minRent = await connection.getMinimumBalanceForRentExemption(0);
        const txInstructions = [
            SystemProgram.transfer({
                fromPubkey: pubkey,
                toPubkey,
                lamports: count * LAMPORTS_PER_SOL,
            }),
        ];
        console.log(
            "   ✅ - Step 1 - create an array with your desires `instructions`"
        );

        // * Step 2 - Generate a transaction and send it to the network
        const txid = await createAndSendV0TxByWallet(
            pubkey,
            connection,
            sendTransaction,
            txInstructions
        );
        console.log(
            "   ✅ - Step 2 - Generate a transaction and send it to the network"
        );

        enqueueSnackbar("🎉 Transaction succesfully confirmed!");
        enqueueSnackbar(
            `https://explorer.solana.com/tx/${txid}?cluster=devnet`
        );
    };
    return (
        <>
            <Stack
                justifyContent="center"
                spacing={5}
                alignItems="center"
                marginTop={10}>
                <Item>
                    <Typography variant="h2">
                        Please connect to your wallet for transfer
                    </Typography>
                </Item>

                <Item>
                    <Typography variant="h2">Transfer SOL</Typography>
                </Item>

                <Item>
                    <Typography variant="h5">PublicKey:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${pubkey}?cluster=devnet`}>
                        {`${pubkey}`}
                    </Link>
                </Item>

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
            </Stack>
        </>
    );
};
export default WalletAdapter;
