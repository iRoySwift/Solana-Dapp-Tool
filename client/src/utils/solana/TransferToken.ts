import {
    getAssociatedTokenAddressSync,
    getAccount,
    createAssociatedTokenAccountInstruction,
    TokenAccountNotFoundError,
    TokenInvalidAccountOwnerError,
    type Account,
    TokenInvalidMintError,
    TokenInvalidOwnerError,
} from "@solana/spl-token";
import {
    Keypair,
    type Connection,
    type PublicKey,
    type TransactionInstruction,
} from "@solana/web3.js";
import { createAndSendV0TxByWallet } from "./sendTransaction";
import type { WalletAdapterProps } from "@solana/wallet-adapter-base";
import { info } from "console";

/**
 * Retrieve the associated token account, or create it if it doesn't exist
 *
 * @param connection               Connection to use
 * @param pubkey                   Payer of the initialization fees
 * @param mint                     Mint associated with the account to set or verify
 * @param owner                    Owner of the account to set or verify
 * @param sendTransaction          from useWallet
 * @return Address of the new associated token account
 */
export async function getOrCreateAssociatedTokenAccount(
    connection: Connection,
    pubkey: PublicKey,
    mint: PublicKey,
    owner: PublicKey,
    sendTransaction: WalletAdapterProps["sendTransaction"]
): Promise<PublicKey> {
    let ataAccount = await getAssociatedTokenAddressSync(mint, owner);

    // This is the optimal logic, considering TX fee, client-side computation, RPC roundtrips and guaranteed idempotent.
    // Sadly we can't do this atomically.
    let account: Account;
    try {
        account = await getAccount(connection, ataAccount);
    } catch (error: unknown) {
        if (
            error instanceof TokenAccountNotFoundError ||
            error instanceof TokenInvalidAccountOwnerError
        ) {
            try {
                let txInstructions: TransactionInstruction[] = [];
                txInstructions.push(
                    createAssociatedTokenAccountInstruction(
                        pubkey,
                        ataAccount,
                        owner,
                        mint
                    )
                );
                await createAndSendV0TxByWallet(
                    pubkey,
                    connection,
                    sendTransaction,
                    txInstructions
                );
            } catch (error) {
                throw error;
            }

            // Now this should always succeed
            account = await getAccount(connection, ataAccount);
        } else {
            throw error;
        }
    }
    if (!account.mint.equals(mint)) throw new TokenInvalidMintError();
    if (!account.owner.equals(owner)) throw new TokenInvalidOwnerError();

    return ataAccount;
}
