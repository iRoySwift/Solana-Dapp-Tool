//! Program error
use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use solana_program::{
    decode_error::DecodeError,
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

/// Greetings Error Enum
#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum GreetingAccountError {
    /// Not owner by GreetingAccount program
    #[error("Not owner by GreetingAccount program")]
    NotOwnedByGreetingAccount,
}

/// type of GreetingAccount
pub type GreetingAccountResult = Result<(), GreetingAccountError>;

impl From<GreetingAccountError> for ProgramError {
    fn from(e: GreetingAccountError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for GreetingAccountError {
    fn type_of() -> &'static str {
        "HelloWorldError"
    }
}

impl PrintProgramError for GreetingAccountError {
    fn print<E>(&self)
    where
        E: 'static + std::error::Error + DecodeError<E> + PrintProgramError + FromPrimitive,
    {
        match self {
            Self::NotOwnedByGreetingAccount => {
                msg!("Error: Greeted account does not have correct program id")
            }
        }
    }
}
