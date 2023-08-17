import {
    Box,
    Button,
    Link,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    styled,
} from "@mui/material";
import {
    AccountLayout,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccount,
    createMint,
    getAssociatedTokenAddress,
    getMint,
    mintTo,
} from "@solana/spl-token";
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    type Signer,
} from "@solana/web3.js";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import { enqueueSnackbar } from "notistack";

function createData(
    mintAddress: PublicKey,
    ata: PublicKey,
    balance: number,
    mintNumber: number
) {
    return { mintAddress, ata, balance, mintNumber };
}

const Item = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
}));

type itokenItem = {
    mintAddress: PublicKey;
    ata: PublicKey;
    balance: Number;
    mintNumber: number;
};

interface Props {
    signer: Signer;
    connection: Connection;
}
const MintToken: React.FC<Props> = ({ signer, connection }) => {
    const [balance, setBalance] = useState(0);
    const [tokenList, setTokenList] = useState<itokenItem[]>([]);
    const [loading, setLoading] = useState(false);

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

    // Airdrop
    const handleAirdrop = async () => {
        const signature = await connection.requestAirdrop(
            signer.publicKey,
            LAMPORTS_PER_SOL
        );
        const {
            value: { blockhash, lastValidBlockHeight },
        } = await connection.getLatestBlockhashAndContext();
        const confirmation = await connection.confirmTransaction({
            signature,
            blockhash,
            lastValidBlockHeight,
        });
        if (confirmation.value.err) {
            throw new Error("   ❌ - 4. Transaction not confirmed.");
        }

        enqueueSnackbar("🎉 Transaction succesfully confirmed!", {
            variant: "success",
        });
        enqueueSnackbar(
            `https://explorer.solana.com/tx/${signature}?cluster=devnet`,
            {
                variant: "success",
            }
        );
    };

    // 创建Token和ATA
    const createToken = async () => {
        setLoading(true);
        // 创建一个新的 mint （铸币）
        const mint: PublicKey = await createMint(
            connection,
            signer,
            signer.publicKey,
            signer.publicKey,
            9
        );
        console.log(`   ✅ - Token mint address: ${mint.toBase58()}`);

        // 创建AYTA账号
        const ata = await createAssociatedTokenAccount(
            connection,
            signer,
            mint,
            signer.publicKey
        );
        console.log(`   ✅ - Token ATA address: ${ata.toBase58()}`);

        setLoading(false);

        enqueueSnackbar("🎉 Mint Token succesfully!", {
            variant: "success",
        });
    };

    // Mint Token
    const handleMintToken = async (
        mint: PublicKey,
        ata: PublicKey,
        mintNumber: number
    ) => {
        setLoading(true);

        const Signature = await mintTo(
            connection,
            signer,
            mint,
            ata,
            signer,
            mintNumber * LAMPORTS_PER_SOL
        );

        setLoading(false);

        console.log(
            `   ✅ - Mint ${mintNumber} Token To ${ata.toBase58()} transaction:${Signature}`
        );
        enqueueSnackbar(`🎉 Mint ${mintNumber} Token succesfully!`, {
            variant: "success",
        });
    };

    // 查询Token列表
    const queryTokenList = async () => {
        setLoading(true);
        let arr: itokenItem[] = [];
        setTokenList([]);
        const result: any = await connection.getTokenAccountsByOwner(
            signer.publicKey,
            {
                programId: TOKEN_PROGRAM_ID,
            }
        );
        result.value.forEach(async item => {
            // 处理Unit8Array数据
            const dataUnit8Array = item.account.data;
            // 将Unit8Array转换为JSON
            const accountInfo = AccountLayout.decode(dataUnit8Array);

            // 筛选拥有铸币权限的token
            const mintInfo = await getMint(connection, accountInfo.mint);
            if (
                mintInfo.mintAuthority?.toBase58() ===
                signer.publicKey.toBase58()
            ) {
                arr.push(
                    createData(
                        accountInfo.mint,
                        item.pubkey,
                        Number(accountInfo.amount / BigInt(LAMPORTS_PER_SOL)),
                        1
                    )
                );
            }
        });
        setTimeout(() => {
            setTokenList(arr);
            setLoading(false);
        }, 10000);
    };

    const handleUpdateMintNumber = (pubkey, v) => {
        console.log(v);
        let arr = tokenList.map(item => {
            if (item.ata === pubkey) {
                item.mintNumber = Number(v.target.value);
            }
            return item;
        });
        console.log(arr, tokenList);
    };

    return (
        <Box sx={{ flex: 1, overflow: "auto", paddingRight: 3 }}>
            <Typography variant="h4">Mint Token</Typography>
            <Stack spacing={5} marginTop={5}>
                <Item>
                    <Typography variant="h5">Public Key:</Typography>
                    <Link
                        target="_blank"
                        href={`https://explorer.solana.com/address/${signer.publicKey}?cluster=devnet`}>
                        {`${signer.publicKey}`}
                    </Link>
                </Item>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5">Balance:</Typography>
                    <span>{balance / LAMPORTS_PER_SOL}</span>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleQueryWallet}>
                        Query
                    </Button>
                </Stack>
                {/* <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography variant="h5">Airdrop:</Typography>
                </Stack> */}
                <Item>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={handleAirdrop}>
                        Airdrop
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={createToken}>
                        Create Token
                    </Button>
                </Item>
                <Item>
                    <Typography variant="h5">Token List:</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={queryTokenList}>
                        Query
                    </Button>
                </Item>
                <TableContainer
                    sx={{ maxWidth: "100%", overflow: "auto" }}
                    component={Paper}>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Mint Address</TableCell>
                                <TableCell>ATA</TableCell>
                                <TableCell align="right">
                                    Balance(Number)
                                </TableCell>
                                <TableCell align="right">
                                    Mint Number(Number)
                                </TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tokenList.map(row => (
                                <TableRow
                                    key={`${row.mintAddress}`}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}>
                                    <TableCell component="th" scope="row">
                                        {`${row.mintAddress}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        {`${row.ata}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        {`${row.balance}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        <TextField
                                            hiddenLabel
                                            id="filled-hidden-label-small"
                                            defaultValue={row.mintNumber}
                                            variant="outlined"
                                            size="small"
                                            type="number"
                                            onChange={v =>
                                                handleUpdateMintNumber(
                                                    row.ata,
                                                    v
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            onClick={() =>
                                                handleMintToken(
                                                    row.mintAddress,
                                                    row.ata,
                                                    row.mintNumber
                                                )
                                            }>
                                            Mint
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {!tokenList.length && (
                        <Box
                            sx={{
                                width: "100%",
                                padding: 2,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                            暂无数据
                        </Box>
                    )}
                </TableContainer>
            </Stack>
            {loading && <Loading />}
        </Box>
    );
};
export default MintToken;
