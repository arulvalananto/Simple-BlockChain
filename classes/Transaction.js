const crypto = require("crypto");
const EC = require("elliptic").ec;

const ec = new EC("secp256k1");

class Transaction {
  constructor(payer, payee, amount) {
    this.payer = payer;
    this.payee = payee;
    this.amount = amount;
  }

  calculateHash() {
    return crypto
      .createHmac("sha256", process.env.SECRET)
      .update(this.payer + this.payee + this.amount)
      .digest("hex");
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic("hex") !== this.payer) {
      throw Error("You cannot do this");
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  }

  verify() {
    if (this.payer === null) return true;

    if (!this.signature || !this.signature.length) {
      throw new Error("No signature found");
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, "hex");
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

module.exports = Transaction;
