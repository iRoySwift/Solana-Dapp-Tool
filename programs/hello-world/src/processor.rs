use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    /// number of greetings
    pub counter: u32,
}

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Increment and store the number of times the account has been greeted
    let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;

    println!("greeting_account{:?}", greeting_account);

    greeting_account.counter += 1;
    // greeting_account.greeting = String::from("hello");

    println!("greeting_account2{:?}", greeting_account);
    println!("account.data.borrow_mut(){:?}", account.data.borrow_mut());
    greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_account.counter);

    Ok(())
}

// Sanity tests
#[cfg(test)]
mod tests {
    use crate::{entrypoint::process_instruction, processor::GreetingAccount};
    use borsh::BorshDeserialize;
    use solana_program::{account_info::AccountInfo, pubkey::Pubkey, stake_history::Epoch};
    use std::mem;

    // cargo test test_sanity -- --nocapture
    #[test]
    fn test_sanity() {
        let program_id = Pubkey::default();
        let instruction_data: Vec<u8> = Vec::new();
        let key = Pubkey::default();
        let is_signer = false;
        let is_writable = true;
        let mut lamports = 0;
        let mut data = vec![0; mem::size_of::<u32>()];
        let owner = Pubkey::default();
        let executable = false;
        let rent_epoch = Epoch::default();

        println!("key: {:?}", key);
        println!("data: {:?}", data);
        println!("rent_epoch: {:?}", rent_epoch);

        let account = AccountInfo::new(
            &key,
            is_signer,
            is_writable,
            &mut lamports,
            &mut data,
            &owner,
            executable,
            rent_epoch,
        );

        let accounts = vec![account];

        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            0
        );
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            1
        );
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            2
        );
    }

    #[test]
    fn test_slice() {
        println!("teset slice with")
    }
}
