import * as Web3 from "@solana/web3.js";
// import fs from "fs";
import bs58 from "bs58";

async function initializeKeypair(): Promise<Web3.Keypair> {
    if (!process.env.REACT_APP_PRIVATE_KEY) {
        console.log("Generating new keypair... 🗝️");
        const signer = Web3.Keypair.generate();

        console.log("Creating .env file");
        // fs 是 node方法
        // fs.appendFileSync(
        //     ".env",
        //     `PRIVATE_KEY=[${signer.secretKey.toString()}]`
        // );
        return signer;
    }

    // keypair
    const secretKeyArray = JSON.parse(
        process.env.REACT_APP_PRIVATE_KEY
    ) as number[];
    const secretKeyU8Array: Uint8Array = Uint8Array.from(secretKeyArray);
    // Create a keypair from a raw secret key byte array.
    const signer = Web3.Keypair.fromSecretKey(secretKeyU8Array);
    // Uint8Array => bs58
    const privatKey = bs58.encode(secretKeyU8Array);
    console.log(
        "🚀 ~ file: initializeKeypair.ts:24 ~ initializeKeypair ~ address:",
        privatKey
    );

    return signer;
}

export default initializeKeypair;
