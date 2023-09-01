//! Program entrypoint

use crate::error::GreetingAccountError;
use crate::processor::Processor;
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::PrintProgramError, pubkey::Pubkey,
};

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

/// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    if let Err(err) = Processor::process_instruction(program_id, accounts, instruction_data) {
        // catch the error
        err.print::<GreetingAccountError>();
        return Err(err);
    }
    Ok(())
}
