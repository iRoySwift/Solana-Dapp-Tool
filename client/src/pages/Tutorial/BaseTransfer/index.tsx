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
const BaseTransfer: React.FC<Props> = () => {
    const [pubkey, setPubkey] = useState<PublicKey>();
    const [balance, setBalance] = useState(0);
    const [toPubkey, setToPubkey] = useState(
        "HQ9Jn1KNwKyPkDyBmQtXtMWn1DXP52jRGzahx3U2Wfky"
    );
    const [count, SetCount] = useState(0);

    let url = "https://api.devnet.solana.com";
    const connection = new Connection(url);

    const signer = useRef<Keypair>();

    const handleGenerateWallet = async () => {
        signer.current = await initializeKeypair();
        enqueueSnackbar(
            `import account: ${signer.current.publicKey.toString()}`,
            {
                variant: "success",
            }
        );
        setPubkey(signer.current.publicKey);
    };

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
        if (!signer.current) {
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
                fromPubkey: signer.current.publicKey,
                toPubkey: newtoPubkey,
                lamports: count * LAMPORTS_PER_SOL,
            }),
        ];

        // Step 2 - Generate a transaction and send it to the network
        createAndSendV0Tx(signer.current, connection, instructions);
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
                    <Typography variant="h2">
                        Please generate your wallet for airdrop
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
                            {`${pubkey}`}
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
        </>
    );
};
export default BaseTransfer;
