import Loading from "@/components/Loading";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";
import {
    Stack,
    Typography,
    Button,
    TextField,
    styled,
    Box,
    Link,
} from "@mui/material";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    TransactionInstruction,
} from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

// token mint
const Token_Mint = new PublicKey(
    "CQ68EPr2bHQ29bLZdHioLx5An35hfav1mqn36hG74ofH"
);
// to 钱包地址
const TO_PUBLIC_KEY = new PublicKey(
    "Gir7LUMrsXHv5gGctKNp6th2Pj7j9qmYR1LSrsHS6Yaj"
);

/**
 * Construct a Transfer instruction
 *
 * @param source       Source account
 * @param destination  Destination account
 * @param owner        Owner of the source account
 * @param amount       Number of tokens to transfer
 * @param multiSigners Signing accounts if `owner` is a multisig
 * @param programId    SPL Token program account
 *
 * @return Instruction to add to a transaction
 */
const createTransferInstruction = (
    source: PublicKey,
    destination: PublicKey,
    owner: PublicKey,
    amount: number | bigint,
    programId = TOKEN_PROGRAM_ID
) => {
    const keys = [
        { pubkey: source, isSigner: false, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
        { pubkey: owner, isSigner: true, isWritable: false },
    ];
    const data = Buffer.alloc(9);
    data.writeUInt8(3);
    const bigAmount = BigInt(amount);
    data.writeBigInt64LE(bigAmount, 1);

    return new TransactionInstruction({ keys, programId, data });
};

interface Props {}
const ContractCall: React.FC<Props> = () => {
    const { publicKey: pubkey, sendTransaction } = useWallet();
    const [balance, setBalance] = useState(0);
    const [ataPubkey, setAtaPubkey] = useState<PublicKey>();
    const [ataBalance, setAtaBalance] = useState<number>(0);
    const [toAtaPubkey, setToAtaPubkey] = useState<PublicKey>();
    const [count, SetCount] = useState(0);
    const { connection } = useConnection();
    const [loading, setLoading] = useState(false);

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

    /**
     * 查询Pubkey token的ATA账号
     * @param pubkey
     * @returns
     */
    const handleQueryTokenAta = async pubkey => {
        if (!pubkey) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        const res = await connection.getTokenAccountsByOwner(pubkey, {
            mint: Token_Mint,
        });
        if (!res.value.length) {
            enqueueSnackbar(`${pubkey} doesn't has a ATA of ${Token_Mint}`, {
                variant: "warning",
            });
            return;
        }
        enqueueSnackbar(`${pubkey} has a ATA of ${res.value[0].pubkey}`, {
            variant: "success",
        });
        return res.value[0].pubkey;
    };

    const handleQueryTokenBalance = async () => {
        if (!ataPubkey) {
            enqueueSnackbar(`Please connect to your wallet`, {
                variant: "warning",
            });
            return;
        }
        connection.getTokenAccountBalance(ataPubkey).then(res => {
            if (!res.value.uiAmount) return;
            setAtaBalance(res.value.uiAmount);
        });
    };

    const handleReciveChange = v => {
        setToAtaPubkey(v.target.value);
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
        if (!toAtaPubkey || !ataPubkey) {
            enqueueSnackbar(`Token ATA don't exsit`, {
                variant: "warning",
            });
            return;
        }
        setLoading(true);

        // * Step 1 - create an array with your desires `instructions`
        let lamports = await connection.getMinimumBalanceForRentExemption(0);
        const txInstructions = [
            createTransferInstruction(
                ataPubkey,
                toAtaPubkey,
                pubkey,
                lamports,
                TOKEN_PROGRAM_ID
            ),
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

        setLoading(false);

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
                    <Typography variant="h2">Transfer SPL Token</Typography>
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

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">Token:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${Token_Mint}?cluster=devnet`}>
                        {`${Token_Mint}`}
                    </Link>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">ATA Public Key:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${ataPubkey}?cluster=devnet`}>
                        {`${ataPubkey || ""}`}
                    </Link>
                    {!ataPubkey && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={async () => {
                                const newAtaPubkey = await handleQueryTokenAta(
                                    pubkey
                                );
                                setAtaPubkey(newAtaPubkey);
                            }}>
                            Query Token
                        </Button>
                    )}
                </Box>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5">ATA Balance:</Typography>
                    <span>{ataBalance}</span>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleQueryTokenBalance}>
                        Query
                    </Button>
                </Stack>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">To Public Key:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${TO_PUBLIC_KEY}?cluster=devnet`}>
                        {`${TO_PUBLIC_KEY || ""}`}
                    </Link>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h5">To ATA Public Key:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${toAtaPubkey}?cluster=devnet`}>
                        {`${toAtaPubkey || ""}`}
                    </Link>
                    {!toAtaPubkey && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={async () => {
                                const newAtaPubkey = await handleQueryTokenAta(
                                    TO_PUBLIC_KEY
                                );
                                console.log(newAtaPubkey, "newAtaPubkey");

                                setToAtaPubkey(newAtaPubkey);
                            }}>
                            Query Token
                        </Button>
                    )}
                </Box>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <TextField
                        id="recived_address"
                        label="Recive Address"
                        variant="outlined"
                        value={`${toAtaPubkey || ""}`}
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
                                max: ataBalance,
                            },
                        }}
                        defaultValue={count}
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
            {loading && <Loading />}
        </>
    );
};
export default ContractCall;
