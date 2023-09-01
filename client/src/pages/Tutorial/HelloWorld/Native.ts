// No imports needed: web3, borsh, pg and more are globally available
// ts-node --esm ./Native.ts
// node --experimental-specifier-resolution=node --loader ts-node/esm ./Native.ts
import assert from "assert";
import * as borsh from "borsh";
import web3, {
    // clusterApiUrl,
    SystemProgram,
    Connection,
    Keypair,
    PublicKey,
} from "@solana/web3.js";

const PRIVATE_KEY = `[37,37,60,131,98,125,34,130,135,2,57,248,169,60,174,216,219,70,59,155,64,7,77,104,33,204,94,10,112,105,150,19,81,152,193,57,135,12,148,233,95,219,65,201,180,32,3,250,82,142,28,180,128,106,126,102,144,196,181,26,146,135,251,94]`;

// keypair
const secretKeyArray = JSON.parse(PRIVATE_KEY || "[]") as number[];

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

class Assignable {
    constructor(propertities) {
        Object.keys(propertities).map(key => {
            this[key] = propertities[key];
        });
    }
}

// Our instruction payload vocabulary
class GreetingAccountInstruction extends Assignable {}

// Borsh needs a schema describing the payload
const GreetingAccountInstructionSchema = new Map([
    [
        GreetingAccountInstruction,
        {
            kind: "struct",
            fields: [
                ["id", "u8"],
                ["counter", "u32"],
            ],
        },
    ],
]);

// Instruction Variant indexes
enum InstructionVariant {
    Greeting = 0,
}

/**
 * The expected size of each greeting account.
 */
const GREETING_SIZE = borsh.serialize(
    GreetingSchema as unknown as borsh.Schema,
    new GreetingAccount()
).length;

const test = async () => {
    // Create greetings account instruction
    const greetingAccountKp = new web3.Keypair();
    const lamports = await pg.connection.getMinimumBalanceForRentExemption(
        GREETING_SIZE
    );
    const createGreetingAccountIx = SystemProgram.createAccount({
        fromPubkey: pg.wallet.publicKey,
        lamports,
        newAccountPubkey: greetingAccountKp.publicKey,
        programId: pg.PROGRAM_ID,
        space: GREETING_SIZE,
    });

    const helloTx = new GreetingAccountInstruction({
        id: InstructionVariant.Greeting,
        counter: 2,
    });

    //serialize the payload
    const helloSerBuffer = Buffer.from(
        borsh.serialize(GreetingAccountInstructionSchema, helloTx)
    );

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
        data: helloSerBuffer,
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
};

test();
