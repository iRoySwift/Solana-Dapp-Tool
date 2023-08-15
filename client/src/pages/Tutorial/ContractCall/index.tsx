import {
    Stack,
    Typography,
    Button,
    TextField,
    styled,
    Box,
    Link,
} from "@mui/material";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    PublicKey,
    TransactionMessage,
    VersionedTransaction,
    type Signer,
    TransactionInstruction,
} from "@solana/web3.js";
import { createAssociatedTokenAccount } from "@solana/spl-token";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";

const Item = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));

// to 钱包地址
const TO_PUBLIC_KEY = new PublicKey(
    "6w9P6s2HFHRXRfCSxkatUznwq2cnHxvi52pxZJAJb1Wx"
);
const TOKEN_PROGRAM_ID = new PublicKey(
    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
const Token_Mint = new PublicKey(
    "CQ68EPr2bHQ29bLZdHioLx5An35hfav1mqn36hG74ofH"
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
    // multiSigners: (Signer | PublicKey)[] = [],
    programId = TOKEN_PROGRAM_ID
) => {
    const keys = [
        { pubkey: source, isSigner: true, isWritable: true },
        { pubkey: destination, isSigner: false, isWritable: true },
        { pubkey: owner, isSigner: true, isWritable: true },
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
    const [ataBalance, setAtaBalance] = useState(0);
    const [toAtaPubkey, setToAtaPubkey] = useState<PublicKey>();
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
        enqueueSnackbar(`transfer to ${toAtaPubkey} ${count} Token`, {
            variant: "info",
        });
        enqueueSnackbar(`SystemProgram: ${SystemProgram.programId.toBase58()}`);
        console.log("   ✅ - Test v0 Transfer");

        // Step 1 - get token Ata for toPubkey
        const toPubkeyTokenAta = await connection.getTokenAccountsByOwner(
            toAtaPubkey,
            {
                mint: Token_Mint,
            }
        );
        if (!toPubkeyTokenAta.value.length) {
        }
        console.log(
            "🚀 ~ file: index.tsx:169 ~ handleTransfer ~ toPubkeyTokenAta:",
            toPubkeyTokenAta
        );

        // Step 2 - create an array with your desires `instructions`
        // let minRent = await connection.getMinimumBalanceForRentExemption(0);
        const txInstructions = [
            // SystemProgram.transfer({
            //     fromPubkey: pubkey,
            //     toPubkey: newtoPubkey,
            //     lamports: count * LAMPORTS_PER_SOL,
            // }),
            createTransferInstruction(
                ataPubkey,
                toAtaPubkey,
                pubkey,
                count * LAMPORTS_PER_SOL,
                TOKEN_PROGRAM_ID
            ),
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
                    {!balance && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleQueryWallet}>
                            Query
                        </Button>
                    )}
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
                    {!ataBalance && (
                        <Button
                            variant="contained"
                            size="small"
                            onClick={handleQueryTokenBalance}>
                            Query
                        </Button>
                    )}
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
                    <Typography variant="h5">
                        To Token ATA Public Key:
                    </Typography>
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
                                setAtaPubkey(newAtaPubkey);
                            }}>
                            Query Token ATA
                        </Button>
                    )}
                </Box>

                <Stack direction="row" alignItems="center" spacing={2}>
                    <TextField
                        id="recived_address"
                        label="Recive Address"
                        variant="outlined"
                        value={toAtaPubkey}
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
export default ContractCall;
