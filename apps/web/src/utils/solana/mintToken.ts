import {
  MINT_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  createInitializeMint2Instruction,
  createInitializeMintInstruction,
  createMintToInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getMinimumBalanceForRentExemptMint,
} from "@solana/spl-token";
import {
  Keypair,
  PublicKey,
  SystemProgram,
  type Connection,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {
  createCreateMetadataAccountV3Instruction,
  PROGRAM_ID,
} from "@metaplex-foundation/mpl-token-metadata";

/**
 * 创建Token
 * @param connection       Connection to use from useWallet
 * @param owner            Owner of the new account
 * @param mint             Token mint account
 * @param amount           supply Amount to mint
 * @param decimals         Number of decimals in token account amounts
 * @returns
 */
const createTokenInstructions = async (
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey,
  amount: number,
  decimals: number
): Promise<TransactionInstruction[]> => {
  console.log("🚀 ~ decimals:", decimals);
  const lamports = await getMinimumBalanceForRentExemptMint(connection);
  const tokenATA = await getAssociatedTokenAddress(mint, owner);

  // * Step 1 - create an array with your desires `instructions`
  const instructions = [
    SystemProgram.createAccount({
      fromPubkey: owner,
      newAccountPubkey: mint,
      space: MINT_SIZE,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    }),
    createInitializeMintInstruction(
      mint,
      decimals,
      owner,
      owner,
      TOKEN_PROGRAM_ID
    ),
    createAssociatedTokenAccountInstruction(owner, tokenATA, owner, mint),
    createMintToInstruction(
      mint,
      tokenATA,
      owner,
      amount * Math.pow(10, decimals)
    ),
  ];
  return instructions;
};

/**
 * 创建Token info
 * @param owner            Owner of the new account
 * @param mint             Token mint account
 * @param name             Token name
 * @param symbol           Token symbol
 * @param uri              metadata url
 * @returns
 */
const createMetadataInstruction = (
  owner: PublicKey,
  mint: PublicKey,
  name: string,
  symbol: string,
  uri: string
): TransactionInstruction => {
  const instruction = createCreateMetadataAccountV3Instruction(
    {
      metadata: PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID.toBuffer(), mint.toBuffer()],
        PROGRAM_ID
      )[0],
      mint,
      mintAuthority: owner,
      payer: owner,
      updateAuthority: owner,
    },
    {
      createMetadataAccountArgsV3: {
        data: {
          name,
          symbol,
          uri,
          creators: null,
          sellerFeeBasisPoints: 0,
          uses: null,
          collection: null,
        },
        isMutable: false,
        collectionDetails: null,
      },
    }
  );
  return instruction;
};

/**
 * Mint Token
 * @param connection      Connection to use from useWallet
 * @param owner           Owner of the new account
 * @param mint            Mint Address
 * @param amount          Amount to mint
 * @param decimals         Number of decimals in token account amounts
 * @returns
 */
const mintTokenInstructions = async (
  connection: Connection,
  owner: PublicKey,
  mint: PublicKey,
  amount: number,
  decimals: number = 9
): Promise<TransactionInstruction[]> => {
  // * Step 1 - create an array with your desires `instructions`
  // 获取ATA账号
  const tokenATA = await getAssociatedTokenAddress(mint, owner);

  let instructions: TransactionInstruction[] = [];
  try {
    await getAccount(connection, tokenATA);
  } catch (error) {
    instructions.push(
      createAssociatedTokenAccountInstruction(owner, tokenATA, owner, mint)
    );
  }
  instructions.push(createMintToInstruction(mint, tokenATA, owner, amount));
  return instructions;
};

export {
  createTokenInstructions,
  createMetadataInstruction,
  mintTokenInstructions,
};
