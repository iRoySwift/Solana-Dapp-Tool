import {
    Box,
    Button,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import {
    LAMPORTS_PER_SOL,
    type Connection,
    PublicKey,
    TransactionInstruction,
} from "@solana/web3.js";
import React, { useState, type ChangeEvent } from "react";
import { AlertTip, type itokenItem } from "./TokenList";
import { createTransferInstruction } from "@solana/spl-token";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";
import { enqueueSnackbar } from "notistack";
import Loading from "@/components/Loading";
import { getOrCreateAssociatedTokenAccount } from "@/utils/solana";

interface Props {
    connection: Connection;
    pubkey: PublicKey | null;
    sendTransaction: WalletAdapterProps["sendTransaction"];
    destinations: String[] | undefined;
    selectToken: itokenItem | undefined;
}
const TransferToken: React.FC<Props> = ({
    connection,
    pubkey,
    sendTransaction,
    destinations,
    selectToken,
}) => {
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);

    // 创建对应钱包的Token的ATA and transfer
    const handleTransfer = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        if (!selectToken || !destinations || !destinations.length) {
            return;
        }
        setLoading(true);

        // * Step 1 获取ATA账号
        const ataPubkey = await getOrCreateAssociatedTokenAccount(
            connection,
            pubkey,
            new PublicKey(selectToken.mint),
            pubkey
        );

        let toAtaPubkeys = await Promise.all(
            destinations.map(dest =>
                getOrCreateAssociatedTokenAccount(
                    connection,
                    pubkey,
                    selectToken.mint,
                    new PublicKey(dest)
                )
            )
        );
        console.log("   ✅ - Step 1 获取ATA账号");

        // * Step 2 - create an array with your desires `instructions`
        let txInstructions: TransactionInstruction[] = [];

        toAtaPubkeys.forEach(toAtaPubkey => {
            txInstructions.push(
                createTransferInstruction(
                    ataPubkey,
                    toAtaPubkey,
                    pubkey,
                    count * LAMPORTS_PER_SOL
                )
            );
        });

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

    const handleChangeAmount = (
        v: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setCount(Number(v.target.value));
    };

    return (
        <>
            <Box sx={{ flex: 1, pl: 3, overflowY: "auto" }}>
                <Stack alignItems={"center"}>
                    <Typography variant="h4">一键空投Token</Typography>
                </Stack>
                <Stack flexDirection={"row"} alignItems={"center"} mt={2}>
                    <InputLabel sx={{ width: 150 }} htmlFor="number">
                        请输入空投数量:
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="number"
                        type="number"
                        variant="outlined"
                        inputProps={{
                            step: 1,
                            min: 0,
                            max: selectToken?.balance,
                            type: "number",
                        }}
                        onChange={handleChangeAmount}
                    />
                </Stack>
                <Stack alignItems={"center"} mt={2}>
                    <Button variant="contained" onClick={handleTransfer}>
                        空投
                    </Button>
                </Stack>
            </Box>
            {loading && <Loading />}
        </>
    );
};
export default TransferToken;
