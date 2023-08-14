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
    enqueueSnackbar(
        `   ✅ - Fetched latest blockhash. Last valid height:,
        ${latestBlockhash.lastValidBlockHeight}`
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
    enqueueSnackbar("   ✅ - Compiled transaction message");
    const transaction = new VersionedTransaction(messageV0);

    // Step 3 - Sign your transaction with the required `Signers`
    transaction.sign([signer]);
    enqueueSnackbar("   ✅ - Transaction Signed");

    // Step 4 - Send our v0 transaction to the cluster
    const txid = await connection.sendTransaction(transaction, {
        maxRetries: 5,
    });
    enqueueSnackbar("   ✅ - Transaction sent to network");

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
