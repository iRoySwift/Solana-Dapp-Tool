//! Program instruction

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    instruction::{AccountMeta, Instruction},
    program_error::ProgramError,
    pubkey::Pubkey,
};

/// Instructions supported by the generic Name Registry program
#[derive(Clone, Debug, BorshSerialize, BorshDeserialize, PartialEq)]
pub enum GreetingAccountInstruction {
    /// Greeting to a account
    ///
    /// Accounts expected by this instruction:
    ///     0. `[writable]` the account to greet
    ///
    Greeting {
        /// greet count
        counter: u32,
    },
}

/// test method
#[allow(clippy::too_many_arguments)]
pub fn greeting(
    program_id: Pubkey,
    instraction_data: GreetingAccountInstruction,
    name_greeting: Pubkey,
) -> Result<Instruction, ProgramError> {
    let data = instraction_data.try_to_vec().unwrap();
    let accounts = vec![AccountMeta::new(name_greeting, false)];
    Ok(Instruction {
        program_id,
        accounts,
        data,
    })
}
