// import Web3 from "@solana/js";

import {
    Keypair,
    Connection,
    TransactionInstruction,
    AddressLookupTableAccount,
    VersionedTransaction,
    TransactionMessage,
} from "@solana/web3.js";
import { enqueueSnackbar } from "notistack";

// * 版本化交易
async function createAndSendV0Tx(
    signer: Keypair,
    connection: Connection,
    txInstructions: TransactionInstruction[],
    lookupTableAccount?: AddressLookupTableAccount
): Promise<VersionedTransaction> {
    // Step 1 - Fetch Latest Blockhash
    let latestBlockhash = await connection.getLatestBlockhash("finalized");
    console.log(
        "   ✅ - Fetched latest blockhash. Last valid height:",
        latestBlockhash.blockhash
    );

    // Step 2 - Generate Transaction Message
    let messageV0;
    if (lookupTableAccount) {
        messageV0 = new TransactionMessage({
            payerKey: signer.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: txInstructions,
        }).compileToV0Message([lookupTableAccount]);
    } else {
        messageV0 = new TransactionMessage({
            payerKey: signer.publicKey,
            recentBlockhash: latestBlockhash.blockhash,
            instructions: txInstructions,
        }).compileToV0Message();
    }
    console.log("   ✅ - Compiled transaction message");
    const transaction = new VersionedTransaction(messageV0);

    // Step 3 - Sign your transaction with the required `Signers`
    transaction.sign([signer]);
    console.log("   ✅ - Transaction Signed");

    // Step 4 - Send our v0 transaction to the cluster
    const txid = await connection.sendTransaction(transaction, {
        maxRetries: 5,
    });
    console.log("   ✅ - Transaction sent to network");

    // Step 5 - Confirm Transaction
    const confirmation = await connection.confirmTransaction({
        signature: txid,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
    });
    if (confirmation.value.err) {
        throw new Error("   ❌ - Transaction not confirmed.");
    }

    console.log(
        "🎉 Transaction succesfully confirmed!",
        "\n",
        `https://explorer.solana.com/tx/${txid}?cluster=devnet`
    );
    enqueueSnackbar(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);

    return transaction;
}

export { createAndSendV0Tx };
