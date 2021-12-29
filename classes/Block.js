const crypto = require("crypto");

class Block {
  constructor(transactions, date = Date.now()) {
    this.timestamp = new Date(date);
    this.transactions = transactions;
    this.previousHash = "";
    this.hash = "";
    this.nonce = 0;
  }

  createHash() {
    return crypto
      .createHmac("sha256", process.env.SECRET)
      .update(
        this.previousHash +
          this.timestamp +
          JSON.stringify(this.transactions) +
          this.nonce
      )
      .digest("hex");
  }

  mine(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.createHash();
    }
    console.log(`⛏️  Block mined: ${this.hash}`);
  }

  hasValidTransactions() {
    for (const trans of this.transactions) {
      if (!trans.verify()) return false;

      return true;
    }
  }
}

module.exports = Block;
