// No imports needed: web3, borsh, pg and more are globally available

import assert from "assert";
import * as borsh from "borsh";
import web3, {
    clusterApiUrl,
    SystemProgram,
    Connection,
    Keypair,
    PublicKey,
} from "@solana/web3.js";

// keypair
const secretKeyArray = JSON.parse(
    process.env.REACT_APP_PRIVATE_KEY || "[]"
) as number[];

const PROGRAM_ID = "2VMQ2eVVwEUPtQzZES3goUjk7QjYcDM9N3RM8jUvms2V";

// Step 1 连接到Solana网络 devnet
// const devnet = clusterApiUrl("devnet");
const devnet = "https://qn-devnet.solana.fm/";
const connection = new Connection(devnet, "confirmed");

// Step 2 创建者账号信息（private key）
const signer = Keypair.fromSecretKey(new Uint8Array(secretKeyArray));

const pg = {
    connection,
    PROGRAM_ID: new PublicKey(PROGRAM_ID),
    wallet: {
        keypair: signer,
        publicKey: signer.publicKey,
    },
};
/**
 * The state of a greeting account managed by the hello world program
 */
class GreetingAccount {
    counter = 0;
    constructor(fields: { counter: number } | undefined = undefined) {
        if (fields) {
            this.counter = fields.counter;
        }
    }
}

/**
 * Borsh schema definition for greeting accounts
 */
const GreetingSchema = new Map([
    [GreetingAccount, { kind: "struct", fields: [["counter", "u32"]] }],
]);

// const GreetingSchema = {
//     struct: {
//         counter: "u32",
//     },
// };

/**
 * The expected size of each greeting account.
 */
const GREETING_SIZE = borsh.serialize(
    GreetingSchema as unknown as borsh.Schema,
    new GreetingAccount()
).length;

describe("Test", () => {
    it("greet", async () => {
        // Create greetings account instruction
        const greetingAccountKp = new web3.Keypair();
        const lamports = await pg.connection.getMinimumBalanceForRentExemption(
            GREETING_SIZE
        );
        console.log(
            "🚀 ~ file: Native.test.ts:81 ~ it ~ pg.PROGRAM_ID:",
            pg.PROGRAM_ID
        );
        const createGreetingAccountIx = SystemProgram.createAccount({
            fromPubkey: pg.wallet.publicKey,
            lamports,
            newAccountPubkey: greetingAccountKp.publicKey,
            programId: pg.PROGRAM_ID,
            space: GREETING_SIZE,
        });

        // Create greet instruction
        const greetIx = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: greetingAccountKp.publicKey,
                    isSigner: false,
                    isWritable: true,
                },
            ],
            programId: pg.PROGRAM_ID,
        });

        // Create transaction and add the instructions
        const tx = new web3.Transaction();
        tx.add(createGreetingAccountIx, greetIx);

        // Send and confirm the transaction
        const txHash = await web3.sendAndConfirmTransaction(pg.connection, tx, [
            pg.wallet.keypair,
            greetingAccountKp,
        ]);
        console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

        // Fetch the greetings account
        const greetingAccount = await pg.connection.getAccountInfo(
            greetingAccountKp.publicKey
        );

        if (!greetingAccount) {
            console.error("Don't get greeting information");
            return;
        }

        // Deserialize the account data
        const deserializedAccountData: any = borsh.deserialize(
            GreetingSchema,
            GreetingAccount,
            greetingAccount.data
        );

        // Assertions
        assert.equal(greetingAccount?.lamports, lamports);

        assert(greetingAccount?.owner.equals(pg.PROGRAM_ID));

        assert.deepEqual(greetingAccount?.data, Buffer.from([1, 0, 0, 0]));

        assert.equal(deserializedAccountData?.counter, 1);
    });
});
