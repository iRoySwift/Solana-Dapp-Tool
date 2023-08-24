import {
    getAssociatedTokenAddressSync,
    getAccount,
    createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";
import type {
    Connection,
    PublicKey,
    TransactionInstruction,
} from "@solana/web3.js";

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
