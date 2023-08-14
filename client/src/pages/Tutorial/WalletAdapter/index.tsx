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
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    TransactionMessage,
    VersionedTransaction,
} from "@solana/web3.js";
import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

const TO_PUBLIC_KEY = "HQ9Jn1KNwKyPkDyBmQtXtMWn1DXP52jRGzahx3U2Wfky";

interface Props {}
const WalletAdapter: React.FC<Props> = () => {
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0);
    const [toPubkey, setToPubkey] = useState(TO_PUBLIC_KEY);
    const [count, SetCount] = useState(0);
    // const connection = new Connection("https://api.devnet.solana.com");
    const { connection } = useConnection();

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
        setToPubkey(v.target.value);
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
        enqueueSnackbar(`transfer to ${toPubkey} ${count} SOL`, {
            variant: "info",
        });
        enqueueSnackbar(`SystemProgram: ${SystemProgram.programId.toBase58()}`);
        console.log("   ✅ - Test v0 Transfer");

        // Step 1 - new destination address
        const newtoPubkey = new PublicKey(toPubkey);

        // Step 2 - create an array with your desires `instructions`
        // let minRent = await connection.getMinimumBalanceForRentExemption(0);
        const txInstructions = [
            SystemProgram.transfer({
                fromPubkey: pubkey,
                toPubkey: newtoPubkey,
                lamports: count * LAMPORTS_PER_SOL,
            }),
        ];

        // Step 3 - Fetch Latest Blockhash slot
        let {
            context: { slot: minContextSlot },
            value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        enqueueSnackbar(
            `   ✅ - Fetched latest blockhash. Last valid height:,
        ${lastValidBlockHeight}`
        );

        // Step 4 - Generate Transaction Message
        const messageV0 = new TransactionMessage({
            payerKey: pubkey,
            recentBlockhash: blockhash,
            instructions: txInstructions,
        }).compileToV0Message();
        enqueueSnackbar("   ✅ - Compiled transaction message");
        const transaction = new VersionedTransaction(messageV0);

        // Step 5 - Send our v0 transaction to the cluster
        const txid = await sendTransaction(transaction, connection, {
            minContextSlot,
        });

        // Step 5 - Confirm Transaction
        const confirmation = await connection.confirmTransaction({
            signature: txid,
            blockhash,
            lastValidBlockHeight,
        });
        if (confirmation.value.err) {
            throw new Error("   ❌ - Transaction not confirmed.");
        }

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
                        Please connect to your wallet for airdrop
                    </Typography>
                </Item>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">PublicKey:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${pubkey}?cluster=devnet`}>
                        {`${pubkey}`}
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
            </Stack>
        </>
    );
};
export default WalletAdapter;
