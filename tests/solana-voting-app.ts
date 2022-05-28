import * as assert from "assert";
import * as anchor from "@project-serum/anchor";

const { SystemProgram } = anchor.web3;

describe("crunchy-vs-smooth", () => {
  /* Configure the client */
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.SolanaVotingApp;
  const voteAccount = anchor.web3.Keypair.generate();


  it("Initializes with 0 votes for republicians and democrats", async () => {
    await program.rpc.initialize({
      accounts: {
        voteAccount: voteAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [voteAccount],
    });
    
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    assert.ok(
      account.democrats.toString() == 0 && account.republicians.toString() == 0
    );
  });

  it("Votes correctly for republicians", async () => {
    await program.rpc.voteRepublicians({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });

    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    assert.ok(
      account.republicians.toString() == 1 && account.democrats.toString() == 0
    );
  });

  it("Votes correctly for democrats", async () => {
    await program.rpc.voteDemocrats({
      accounts: {
        voteAccount: voteAccount.publicKey,
      },
    });
    const account = await program.account.voteAccount.fetch(
      voteAccount.publicKey
    );

    assert.ok(
      account.republicians.toString() == 1 && account.democrats.toString() == 1
    );
  });
});
