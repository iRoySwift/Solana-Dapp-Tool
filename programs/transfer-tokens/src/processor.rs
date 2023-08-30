//! Program instruction processor

use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

/// Instruction processor
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");
    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;
    msg!(
        "program_id: {:?},accounts: {:?},instruction_data: {:?},account:{:?}",
        program_id,
        accounts,
        instruction_data,
        account
    );
    let accounts_iter = &mut accounts.into_iter();

    let mintAta = next_account_info(accounts_iter)?;
    let toPubkeyAta = next_account_info(accounts_iter)?;
    let pubkeyAta = next_account_info(accounts_iter)?;

    msg!(
        "mintAta: {}, toPubkeyAta:{},pubkeyAta:{}",
        mintAta,
        toPubkeyAta,
        pubkeyAta
    );

    Ok(())
}
