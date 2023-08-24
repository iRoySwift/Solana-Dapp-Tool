import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createInitializeMint2Instruction,
    createMintToInstruction,
    getAssociatedTokenAddressSync,
    getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import {
    Keypair,
    SystemProgram,
    type Connection,
    type PublicKey,
} from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";
import { createAndSendV0TxByWallet } from "./sendTransaction";

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

export { createMintTokenAndAta, mintToken };
