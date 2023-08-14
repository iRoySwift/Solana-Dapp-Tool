import initializeKeypair from "@/utils/solana/initializeKeypair";
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
    Keypair,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
} from "@solana/web3.js";
import React, { useRef, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { createAndSendV0Tx } from "@/utils/solana/sendTransaction";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

interface Props {}
const Airdrop: React.FC<Props> = () => {
    const [pubkey, setPubkey] = useState<String>();
    const [balance, setBalance] = useState(0);
    const [toPubkey, setToPubkey] = useState(
        "HQ9Jn1KNwKyPkDyBmQtXtMWn1DXP52jRGzahx3U2Wfky"
    );
    const [count, SetCount] = useState(0);
    const connection = new Connection("https://api.devnet.solana.com");
    const [open, setOpen] = React.useState(false);

    const singer = useRef<Keypair>();

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleGenerateWallet = async () => {
        singer.current = await initializeKeypair();
        enqueueSnackbar(
            `import account: ${singer.current.publicKey.toString()}`,
            {
                variant: "success",
            }
        );
        setPubkey(singer.current.publicKey.toBase58());
    };

    const handleQueryWallet = async () => {
        if (!singer.current) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        connection.getBalance(singer.current?.publicKey).then(balance => {
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
        if (!singer.current) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        enqueueSnackbar(`transfer to ${toPubkey} ${count} SOL`, {
            variant: "info",
        });
        console.log("   ✅ - Test v0 Transfer");
        // Step 1 - new destination address
        const newtoPubkey = new PublicKey(toPubkey);
        // create an array with your desires `instructions`
        // let minRent = await connection.getMinimumBalanceForRentExemption(0);
        const instructions = [
            SystemProgram.transfer({
                fromPubkey: singer.current.publicKey,
                toPubkey: newtoPubkey,
                lamports: count * LAMPORTS_PER_SOL,
            }),
        ];

        // Step 2 - Generate a transaction and send it to the network
        createAndSendV0Tx(singer.current, connection, instructions);
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
                {!pubkey ? (
                    <Item>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGenerateWallet}>
                            Generate wallet
                        </Button>
                    </Item>
                ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h5">PublicKey:</Typography>
                        <Link
                            target="_blank"
                            href={`https://explorer.solana.com/address/${pubkey}?cluster=devnet`}>
                            {pubkey}
                        </Link>
                    </Box>
                )}

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
            {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: "100%" }}>
                    {`${publicKey} has a balance of ${
                        balance / LAMPORTS_PER_SOL
                    }`}
                </Alert>
            </Snackbar> */}
        </>
    );
};
export default Airdrop;
