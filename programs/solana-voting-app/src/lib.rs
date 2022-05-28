use anchor_lang::prelude::*;

declare_id!("HBXJPm5iV3YB6HXpgiHnXbRcqgSf92xeHR8Bex8qGVSV");

#[program]
pub mod solana_voting_app {
    use anchor_lang::solana_program::entrypoint::ProgramResult;

    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.republicians = 0;
        vote_account.democrats = 0;
        Ok(())
    }

    pub fn vote_republicians(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.republicians += 1;
        Ok(())
    }

    pub fn vote_democrats(ctx: Context<Vote>) -> ProgramResult {
        let vote_account = &mut ctx.accounts.vote_account;
        vote_account.democrats += 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub vote_account: Account<'info, VoteAccount>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Vote<'info> {
    #[account(mut)]
    pub vote_account: Account<'info, VoteAccount>,
}

#[account]
pub struct VoteAccount {
    pub republicians: u64,
    pub democrats: u64,
}
