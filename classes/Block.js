const crypto = require("crypto");

class Block {
  constructor(data, date = Date.now()) {
    this.index = 0;
    this.timestamp = new Date(date);
    this.data = data;
    this.previousHash = "";
    this.hash = "";
    this.nonce = 0;
  }

  createHash() {
    return crypto
      .createHmac("sha256", process.env.SECRET)
      .update(
        this.index +
          this.previousHash +
          this.timestamp +
          JSON.stringify(this.data) +
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
    console.log("Block mined:" + this.hash);

    return this.hash;
  }
}

module.exports = Block;
