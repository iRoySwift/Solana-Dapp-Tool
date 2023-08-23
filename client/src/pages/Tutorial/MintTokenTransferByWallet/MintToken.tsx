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
    ASSOCIATED_TOKEN_PROGRAM_ID,
    AccountLayout,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createInitializeMint2Instruction,
    createMintToInstruction,
    getAssociatedTokenAddressSync,
    getMinimumBalanceForRentExemptMint,
    getMint,
} from "@solana/spl-token";
import {
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    SystemProgram,
    Keypair,
} from "@solana/web3.js";
import React, { useState } from "react";
import Loading from "@/components/Loading";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { createAndSendV0TxByWallet } from "@/utils/solana/sendTransaction";

/**
 * 创建Token and ATA
 * @param connection       Connection to use from useWallet
 * @param pubkey           Payer of the transaction and initialization fees
 * @param sendTransaction  from useWallet
 * @param keypair          Optional keypair, defaulting to a new random one
 * @returns
 */
const createMintTokenAndAta = async (
    connection: Connection,
    pubkey: PublicKey,
    sendTransaction: WalletAdapterProps["sendTransaction"]
) => {
    const mintKeypair = Keypair.generate();

    // * Step 1 - create an array with your desires `instructions`
    // 获取ATA账号
    const ataAccount = getAssociatedTokenAddressSync(
        mintKeypair.publicKey,
        pubkey,
        false,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
    );
    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const instructions = [
        SystemProgram.createAccount({
            fromPubkey: pubkey,
            newAccountPubkey: mintKeypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(
            mintKeypair.publicKey,
            9,
            pubkey,
            pubkey
        ),
        // 创建AYTA
        createAssociatedTokenAccountInstruction(
            pubkey,
            ataAccount,
            pubkey,
            mintKeypair.publicKey
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
        instructions,
        [mintKeypair]
    );
    console.log(
        "   ✅ - Step 2 - Generate a transaction and send it to the network"
    );

    enqueueSnackbar("🎉 Transaction succesfully confirmed!");
    enqueueSnackbar(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    return mintKeypair.publicKey;
};

/**
 * Mint Token
 * @param connection      Connection to use from useWallet
 * @param pubkey          Payer of the transaction and initialization fees
 * @param mint            Mint for the account
 * @param destination     Address of the account to mint to
 * @param amount          Amount to mint
 * @param sendTransaction from useWallet
 * @returns
 */
const mintToken = async (
    connection: Connection,
    pubkey: PublicKey,
    mint: PublicKey,
    destination: PublicKey,
    amount: number,
    sendTransaction: WalletAdapterProps["sendTransaction"]
) => {
    // * Step 1 - create an array with your desires `instructions`
    const instructions = [
        // mint token
        createMintToInstruction(mint, destination, pubkey, amount),
    ];

    // * Step 2 - Generate a transaction and send it to the network
    const txid = await createAndSendV0TxByWallet(
        pubkey,
        connection,
        sendTransaction,
        instructions
    );
    console.log(
        "   ✅ - Step 2 - Generate a transaction and send it to the network"
    );

    enqueueSnackbar("🎉 Transaction succesfully confirmed!");
    enqueueSnackbar(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    return txid;
};

function createData(
    mintAddress: PublicKey,
    ata: PublicKey,
    balance: number,
    authority: boolean,
    mintNumber: number
) {
    return { mintAddress, ata, balance, authority, mintNumber };
}

const Item = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
}));

type itokenItem = {
    mintAddress: PublicKey;
    ata: PublicKey;
    authority: Boolean;
    balance: Number;
    mintNumber: number;
};

interface Props {
    connection: Connection;
    pubkey: PublicKey | null;
    sendTransaction: WalletAdapterProps["sendTransaction"];
}

const AlertTip = () => {
    closeSnackbar();
    enqueueSnackbar(`Please connect to your wallet`, {
        variant: "warning",
    });
};

const MintToken: React.FC<Props> = ({
    connection,
    pubkey,
    sendTransaction,
}) => {
    const [balance, setBalance] = useState(0);
    const [tokenList, setTokenList] = useState<itokenItem[]>([]);
    const [loading, setLoading] = useState(false);

    // Query wallet
    const handleQueryWallet = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);
        const balance = await connection.getBalance(pubkey);
        enqueueSnackbar(
            `${pubkey} has a balance of ${balance / LAMPORTS_PER_SOL}`,
            {
                variant: "success",
            }
        );
        setBalance(balance);
        setLoading(false);
    };

    // Airdrop
    const handleAirdrop = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        const signature = await connection.requestAirdrop(
            pubkey,
            1 * LAMPORTS_PER_SOL
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

    // 创建Token
    const createToken = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);
        // 创建一个新的 mint （铸币）
        const mint: PublicKey = await createMintTokenAndAta(
            connection,
            pubkey,
            sendTransaction
        );
        console.log(`   ✅ - Token mint address: ${mint.toBase58()}`);

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
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);

        const Signature = await mintToken(
            connection,
            pubkey,
            mint,
            ata,
            mintNumber * LAMPORTS_PER_SOL,
            sendTransaction
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
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);
        let arr: itokenItem[] = [];
        setTokenList([]);
        const result: any = await connection.getTokenAccountsByOwner(pubkey, {
            programId: TOKEN_PROGRAM_ID,
        });
        result.value.forEach(async item => {
            // 处理Unit8Array数据
            const dataUnit8Array = item.account.data;
            // 将Unit8Array转换为JSON
            const accountInfo = AccountLayout.decode(dataUnit8Array);
            const ataAccount = await getAssociatedTokenAddressSync(
                accountInfo.mint,
                pubkey
            );

            // 筛选拥有铸币权限的token
            const mintInfo = await getMint(connection, accountInfo.mint);
            console.log(
                "🚀 ~ file: MintToken.tsx:322 ~ queryTokenList ~ ataAccount:",
                ataAccount.toBase58(),
                accountInfo.mint.toBase58(),
                item.pubkey.toString()
            );
            arr.push(
                createData(
                    accountInfo.mint,
                    item.pubkey,
                    Number(accountInfo.amount / BigInt(LAMPORTS_PER_SOL)),
                    mintInfo.mintAuthority?.toBase58() === pubkey.toBase58(),
                    1
                )
            );
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
                        href={`https://explorer.solana.com/address/${pubkey}?cluster=devnet`}>
                        {`${pubkey || ""}`}
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
                                <TableCell align="right">Authority</TableCell>
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
                                        {`${row.authority}`}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.authority && (
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
                                        )}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.authority && (
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
                                        )}
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
