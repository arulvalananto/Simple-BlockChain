const fs = require("fs");

const Block = require("./Block");
const Transaction = require("./Transaction");

class BlockChain {
  constructor() {
    this.difficulty = 2;
    this.blocks = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  createGenesisBlock() {
    const genesisBlock = new Block(
      [
        { payer: null, payee: "satoshi", amount: 500 },
        { payer: "satoshi", payee: "address1", amount: 100 },
      ],
      "2021/12/28"
    );

    genesisBlock.hash = genesisBlock.mine(this.difficulty);

    return genesisBlock;
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  minePendingTransactions(mineRewardAddress) {
    console.time("mining time");
    let block = new Block(this.pendingTransactions);
    const { hash } = this.getLastBlock();

    newBlock.previousHash = hash;
    block.mine(this.difficulty);
    this.blocks.push(block);

    this.pendingTransactions = [
      new Transaction(null, mineRewardAddress, this.miningReward),
    ];
    console.timeEnd("mining time");
  }

  addTransaction(transaction) {
    if (!transaction.payee || !transaction.payer) {
      throw new Error("Transaction must have payer and payee");
    }

    if (!transaction.verify()) {
      throw new Error("cannot add invalid transaction to blocks");
    }

    this.pendingTransactions.push(transaction);
    // console.log(this.pendingTransactions);
  }

  getBalance(address) {
    let balance = 0;

    for (let block of this.blocks) {
      for (let trans of block.transactions) {
        if (trans.payer === address) balance -= trans.amount;
        else if (trans.payee === address) balance += trans.amount;
      }
    }

    return `${address} : ${balance}`;
  }

  // addBlock(newBlock) {
  //   const { hash } = this.getLastBlock();

  //   newBlock.previousHash = hash;
  //   newBlock.hash = newBlock.mine(this.difficulty);
  //   this.blocks.push(newBlock);

  //   fs.writeFile(
  //     "BlockChain.json",
  //     JSON.stringify(this.blocks, null, 4),
  //     (err) => (err ? console.log(err) : "")
  //   );
  // }

  isValidChain() {
    let previousBlock = this.blocks[0];

    for (let currentBlock of this.blocks) {
      if (currentBlock.previousHash === "") break;
      if (
        currentBlock.hash !== currentBlock.createHash() ||
        previousBlock.hash !== currentBlock.previousHash ||
        !currentBlock.hasValidTransactions()
      )
        return false;
      previousBlock = currentBlock;
    }
    return true;
  }
}

module.exports = BlockChain;
