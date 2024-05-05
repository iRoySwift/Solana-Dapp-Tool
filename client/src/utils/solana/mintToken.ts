import {
    MINT_SIZE,
    TOKEN_PROGRAM_ID,
    createAssociatedTokenAccountInstruction,
    createInitializeMint2Instruction,
    createMintToInstruction,
    getAccount,
    getAssociatedTokenAddressSync,
    getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import {
    Keypair,
    SystemProgram,
    type Connection,
    type PublicKey,
    TransactionInstruction,
} from "@solana/web3.js";
import { createAndSendV0TxByWallet } from "./sendTransaction";

/**
 * 创建Token
 * @param connection       Connection to use from useWallet
 * @param pubkey           Payer of the transaction and initialization fees
 * @param sendTransaction  from useWallet
 * @returns
 */
const createToken = async (
    connection: Connection,
    pubkey: PublicKey,
    sendTransaction: WalletAdapterProps["sendTransaction"]
): Promise<PublicKey> => {
    const mintKeypair = Keypair.generate();

    // * Step 1 - create an array with your desires `instructions`

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

    console.log("🎉 Transaction succesfully confirmed!");
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    return mintKeypair.publicKey;
};

/**
 * Mint Token
 * @param connection      Connection to use from useWallet
 * @param pubkey          Payer of the transaction and initialization fees
 * @param mint            Mint Address
 * @param toPubkey        Address to mint to
 * @param amount          Amount to mint
 * @param sendTransaction from useWallet
 * @returns
 */
const mintToken = async (
    connection: Connection,
    pubkey: PublicKey,
    mint: PublicKey,
    toPubkey: PublicKey,
    amount: number,
    sendTransaction: WalletAdapterProps["sendTransaction"]
): Promise<{
    ata: PublicKey;
    txid: string;
}> => {
    // * Step 1 - create an array with your desires `instructions`
    // 获取ATA账号
    const ata = getAssociatedTokenAddressSync(mint, toPubkey);

    let instructions: TransactionInstruction[] = [];
    try {
        await getAccount(connection, ata);
    } catch (error) {
        // 创建AYTA
        instructions.push(
            createAssociatedTokenAccountInstruction(pubkey, ata, toPubkey, mint)
        );
    }
    instructions.push(createMintToInstruction(mint, ata, pubkey, amount));

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

    console.log("🎉 Transaction succesfully confirmed!");
    console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
    return { ata, txid };
};

export { createToken, mintToken };
