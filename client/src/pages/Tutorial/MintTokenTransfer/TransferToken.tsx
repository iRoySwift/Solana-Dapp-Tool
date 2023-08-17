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
    type Signer,
    type Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
} from "@solana/web3.js";
import Loading from "@/components/Loading";
import {
    createTransferInstruction,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { enqueueSnackbar } from "notistack";
import { createAndSendV0Tx } from "@/utils/solana/sendTransaction";

const Item = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
}));

interface Props {
    signer: Signer;
    connection: Connection;
}
const TransferToken: React.FC<Props> = ({ signer, connection }) => {
    const [toPubkey, setToPubkey] = useState<PublicKey>();
    const [mintPubkey, setMintPubkey] = useState<PublicKey>();
    const [loading, setLoading] = useState(false);

    // 创建对应钱包的Token的ATA and transfer
    const handleTransfer = async () => {
        if (!mintPubkey || !toPubkey) {
            return;
        }
        setLoading(true);

        // * Step 1 获取ATA账号
        const ataPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            signer,
            mintPubkey,
            signer.publicKey
        );
        const toAtaPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            signer,
            mintPubkey,
            toPubkey
        );
        console.log("   ✅ - Step 1 获取ATA账号");

        // * Step 2 - create an array with your desires `instructions`
        const txInstructions = [
            createTransferInstruction(
                ataPubkey.address,
                toAtaPubkey.address,
                signer.publicKey,
                1 * LAMPORTS_PER_SOL
            ),
        ];
        console.log(
            "   ✅ - Step 2 - create an array with your desires `instructions`"
        );

        // * Step 3 - Generate a transaction and send it to the network
        const txid = await createAndSendV0Tx(
            signer,
            connection,
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
                        href={`https://explorer.solana.com/address/${signer.publicKey}?cluster=devnet`}>
                        {`${signer.publicKey}`}
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
