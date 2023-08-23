import React, { useState } from "react";
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
    type Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    Account,
    TransactionInstruction,
} from "@solana/web3.js";
import Loading from "@/components/Loading";
import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createTransferInstruction,
    getAccount,
    getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import {
    createAndSendV0Tx,
    createAndSendV0TxByWallet,
} from "@/utils/solana/sendTransaction";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";

const Item = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
}));

/**
 * Retrieve the associated token account, or create it if it doesn't exist
 *
 * @param connection               Connection to use
 * @param pubkey                    Payer of the initialization fees
 * @param mint                     Mint associated with the account to set or verify
 * @param owner                    Owner of the account to set or verify
 * @param allowOwnerOffCurve       Allow the owner account to be a PDA (Program Derived Address)
 * @return Address of the new associated token account
 */
export async function getOrCreateAssociatedTokenAccount(
    connection: Connection,
    pubkey: PublicKey,
    mint: PublicKey,
    owner: PublicKey
): Promise<PublicKey> {
    const ataAccount = await getAssociatedTokenAddressSync(mint, owner);
    console.log("🚀 ~ file: TransferToken.tsx:57 ~ ataAccount:", ataAccount);

    // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
    // Sadly we can't do this atomically.
    let txInstructions: TransactionInstruction[] = [];
    try {
        await getAccount(connection, ataAccount);
    } catch (error: unknown) {
        txInstructions.push(
            createAssociatedTokenAccountInstruction(
                pubkey,
                ataAccount,
                pubkey,
                mint
            )
        );
    }
    return ataAccount;
}

const AlertTip = () => {
    closeSnackbar();
    enqueueSnackbar(`Please connect to your wallet`, {
        variant: "warning",
    });
};

interface Props {
    connection: Connection;
    pubkey: PublicKey | null;
    sendTransaction: WalletAdapterProps["sendTransaction"];
}
const TransferToken: React.FC<Props> = ({
    connection,
    pubkey,
    sendTransaction,
}) => {
    const [toPubkey, setToPubkey] = useState<PublicKey>();
    const [mintPubkey, setMintPubkey] = useState<PublicKey>();
    const [loading, setLoading] = useState(false);

    // 创建对应钱包的Token的ATA and transfer
    const handleTransfer = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        if (!mintPubkey || !toPubkey) {
            return;
        }
        setLoading(true);

        // * Step 1 获取ATA账号
        const ataPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            pubkey,
            mintPubkey,
            pubkey
        );
        const toAtaPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            pubkey,
            mintPubkey,
            toPubkey
        );
        console.log("   ✅ - Step 1 获取ATA账号");

        // * Step 2 - create an array with your desires `instructions`
        const txInstructions = [
            createTransferInstruction(
                ataPubkey,
                toAtaPubkey,
                pubkey,
                1 * LAMPORTS_PER_SOL
            ),
        ];
        console.log(
            "   ✅ - Step 2 - create an array with your desires `instructions`"
        );

        // * Step 3 - Generate a transaction and send it to the network
        const txid = await createAndSendV0TxByWallet(
            pubkey,
            connection,
            sendTransaction,
            txInstructions
        );
        console.log(
            "   ✅ - Step 3 - Generate a transaction and send it to the network"
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

    const handleToPubkeyChange = e => {
        setToPubkey(new PublicKey(e.target.value));
    };
    const handleMintTokenChange = e => {
        setMintPubkey(new PublicKey(e.target.value));
    };
    return (
        <Box sx={{ flex: 1, overflow: "auto", paddingLeft: 3 }}>
            <Typography variant="h4">Transfer Token</Typography>
            <Stack spacing={5} marginTop={5}>
                <Item>
                    <Typography variant="h5">Public Key:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${pubkey}?cluster=devnet`}>
                        {`${pubkey}`}
                    </Link>
                </Item>
                <Item>
                    <Typography variant="h5">To PubKey:</Typography>
                    <TextField
                        hiddenLabel
                        id="toPubkey"
                        variant="outlined"
                        size="small"
                        defaultValue={toPubkey}
                        onChange={handleToPubkeyChange}
                    />
                </Item>
                <Item>
                    <Typography variant="h5">Mint Token Pubkey:</Typography>
                    <TextField
                        hiddenLabel
                        id="toPubkey"
                        variant="outlined"
                        size="small"
                        defaultValue={mintPubkey}
                        onChange={handleMintTokenChange}
                    />
                </Item>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleTransfer}>
                    Transfer
                </Button>
            </Stack>
            {loading && <Loading />}
        </Box>
    );
};
export default TransferToken;
