import * as crypto from "crypto";

import Block from "./Block";
import Transaction from "./Transaction";

class Chain {
  public static instance = new Chain();

  chain: Block[];
  difficulty: number;

  constructor() {
    this.difficulty = 4;
    this.chain = [
      new Block("null", new Transaction(100, "genesis", "satoshi")),
    ];
  }

  get lastBlock() {
    return this.chain[this.chain.length - 1];
  }

  mine(nonce: number) {
    let solution: number = 1;
    console.log("⛏️ mining...");

    while (true) {
      const attempt = crypto
        .createHash("MD5")
        .update((nonce + solution).toString())
        .digest("hex");

      if (
        attempt.substring(0, this.difficulty) ===
        Array(this.difficulty).join("0")
      ) {
        console.log(`Solved: ${solution}`);
        return solution;
      }
      solution++;
    }
  }

  addBlock(
    transaction: Transaction,
    senderPublicKey: string,
    signature: Buffer
  ) {
    const verifier = crypto.createVerify("SHA256");
    verifier.update(transaction.toString());

    const isValid = verifier.verify(senderPublicKey, signature);

    if (isValid) {
      const newBlock = new Block(this.lastBlock.hash, transaction);
      this.chain.push(newBlock);
      Chain.instance.mine(newBlock.nonce);
    }
  }
}

export default Chain;
