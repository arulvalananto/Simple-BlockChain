const fs = require("fs");

const Block = require("./Block");

class BlockChain {
  constructor() {
    this.difficulty = 4;
    this.blocks = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const genesisBlock = new Block({ name: "Genesis block" }, "2021/12/28");

    genesisBlock.hash = genesisBlock.mine(this.difficulty);

    return genesisBlock;
  }

  getLastBlock() {
    return this.blocks[this.blocks.length - 1];
  }

  addBlock(newBlock) {
    const { index, hash } = this.getLastBlock();

    newBlock.index = index + 1;
    newBlock.previousHash = hash;
    newBlock.hash = newBlock.mine(this.difficulty);
    this.blocks.push(newBlock);

    fs.writeFile(
      "/data/BlockChain.json",
      JSON.stringify(this.blocks, null, 4),
      (err) => (err ? console.log(err) : "")
    );
  }

  isValidChain() {
    let previousBlock = this.blocks[0];

    for (let currentBlock of this.blocks) {
      if (currentBlock.index !== 0) break;
      if (
        currentBlock.hash !== currentBlock.createHash() &&
        previousBlock.hash !== currentBlock.previousHash
      )
        return false;
      previousBlock = currentBlock;
    }
    return true;
  }
}

module.exports = BlockChain;
