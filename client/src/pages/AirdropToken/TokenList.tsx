import Loading from "@/components/Loading";
import { createMintTokenAndAta, mintToken } from "@/utils/solana/mintToken";
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Radio,
    TextField,
} from "@mui/material";
import { TOKEN_PROGRAM_ID, AccountLayout, getMint } from "@solana/spl-token";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { LAMPORTS_PER_SOL, type Connection, PublicKey } from "@solana/web3.js";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import React, { useEffect, useState } from "react";

function createData(
    isChecked: boolean,
    mint: PublicKey,
    ata: PublicKey,
    balance: number,
    authority: boolean,
    amount: number
) {
    return { isChecked, mint, ata, balance, authority, amount };
}

export type itokenItem = {
    isChecked: boolean;
    mint: PublicKey;
    ata: PublicKey;
    authority: Boolean;
    balance: Number;
    amount: number;
};

interface Props {
    connection: Connection;
    pubkey: PublicKey | null;
    sendTransaction: WalletAdapterProps["sendTransaction"];
    setDestinations: (v) => void;
    setSelectToken: (v: itokenItem) => void;
}
export const AlertTip = () => {
    closeSnackbar();
    enqueueSnackbar(`Please connect to your wallet`, {
        variant: "warning",
    });
};
const TokenList: React.FC<Props> = ({
    connection,
    pubkey,
    sendTransaction,
    setDestinations,
    setSelectToken,
}) => {
    const [loading, setLoading] = useState(false);
    const [destinationList, setDestinationList] = useState({
        "6w9P6s2HFHRXRfCSxkatUznwq2cnHxvi52pxZJAJb1Wx": false,
        Gir7LUMrsXHv5gGctKNp6th2Pj7j9qmYR1LSrsHS6Yaj: false,
        HQ9Jn1KNwKyPkDyBmQtXtMWn1DXP52jRGzahx3U2Wfky: false,
        "8jSP1ELAoTw9g4kWXWEuqStFeR5qQW2j67UfVfe23gFX": false,
    });
    const [tokenList, setTokenList] = useState<itokenItem[]>([]);

    // 查询Token列表
    const queryTokenList = async () => {
        if (!pubkey) {
            AlertTip();
            return;
        }
        setLoading(true);
        setTokenList([]);
        const result: any = await connection.getTokenAccountsByOwner(pubkey, {
            programId: TOKEN_PROGRAM_ID,
        });

        let arr: itokenItem[] = await result.value.map(async item => {
            // 处理Unit8Array数据
            const dataUnit8Array = item.account.data;
            // 将Unit8Array转换为JSON
            const accountInfo = AccountLayout.decode(dataUnit8Array);

            // 筛选拥有铸币权限的token
            const mintInfo = await getMint(connection, accountInfo.mint);

            return createData(
                false,
                accountInfo.mint,
                item.pubkey,
                Number(accountInfo.amount / BigInt(LAMPORTS_PER_SOL)),
                mintInfo.mintAuthority?.toBase58() === pubkey.toBase58(),
                1
            );
        });

        Promise.all(arr).then(res => {
            setTokenList(res);
            setLoading(false);
        });
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDestinationList({
            ...destinationList,
            [event.target.name]: event.target.checked,
        });
    };
    const handleUpdateRadio = row => {
        setTokenList(
            tokenList.map(item => {
                item.isChecked = false;
                if (item.ata === row.ata) {
                    item.isChecked = true;
                }
                return item;
            })
        );
        setSelectToken(row);
    };
    const handleUpdateMintNumber = (pubkey, v) => {
        tokenList.map(item => {
            if (item.ata === pubkey) {
                item.amount = Number(v.target.value);
            }
            return item;
        });
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
        amount: number
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
            amount * LAMPORTS_PER_SOL,
            sendTransaction
        );

        setLoading(false);

        console.log(
            `   ✅ - Mint ${amount} Token To ${ata.toBase58()} transaction:${Signature}`
        );
        enqueueSnackbar(`🎉 Mint ${amount} Token succesfully!`, {
            variant: "success",
        });
    };
    useEffect(() => {
        setDestinations(
            Object.keys(destinationList)
                .filter(key => destinationList[key])
                .map(destination => new PublicKey(destination))
        );
    }, [destinationList, setDestinations]);
    return (
        <>
            <Box sx={{ flex: 1, pr: 3, overflowY: "auto" }}>
                <Box>
                    <Typography variant="h5">
                        请选择需要被空投的钱包地址:
                    </Typography>
                    <FormGroup>
                        {Object.keys(destinationList).map(key => (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={destinationList[key]}
                                        name={key}
                                        onChange={handleChange}
                                    />
                                }
                                key={key}
                                label={key}
                            />
                        ))}
                    </FormGroup>
                </Box>
                <Box sx={{ marginTop: 10 }}>
                    <Typography variant="h5">你拥有的Token列表:</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={createToken}>
                        Create Token
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={queryTokenList}>
                        Query
                    </Button>
                    <TableContainer
                        sx={{ maxWidth: "100%", overflow: "auto" }}
                        component={Paper}>
                        <Table stickyHeader aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>Mint</TableCell>
                                    <TableCell>ATA</TableCell>
                                    <TableCell align="right">
                                        Balance(Number)
                                    </TableCell>
                                    <TableCell align="right">
                                        Mint Authority
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
                                        key={`${row.mint}`}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                {
                                                    border: 0,
                                                },
                                        }}>
                                        <TableCell padding="checkbox">
                                            <Radio
                                                checked={row.isChecked}
                                                color="primary"
                                                inputProps={{
                                                    "aria-labelledby":
                                                        "labelId",
                                                }}
                                                onChange={() =>
                                                    handleUpdateRadio(row)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {`${row.mint}`}
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
                                                    defaultValue={row.amount}
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
                                                            row.mint,
                                                            row.ata,
                                                            row.amount
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
                </Box>
            </Box>
            {loading && <Loading />}
        </>
    );
};
export default TokenList;
