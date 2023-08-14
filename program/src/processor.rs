//! Program instruction processor

use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, msg, pubkey::Pubkey};

/// Instruction processor
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instraction: &[u8],
) -> ProgramResult {
    msg!("Hello Solana!");
    msg!(
        "program_id: {},accounts: {:?},instraction: {:?}",
        program_id,
        accounts,
        instraction
    );
    Ok(())
}
