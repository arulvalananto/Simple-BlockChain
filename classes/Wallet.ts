import * as crypto from "crypto";

import Chain from "./Chain";
import Transaction from "./Transaction";

class Wallet {
  public privateKey: string;
  public publicKey: string;

  constructor() {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 570,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
      },
    });
    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  sendMoney(amount: number, payeePublicKey: string) {
    const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

    const sign = crypto.createSign("SHA256");
    sign.update(transaction.toString()).end();

    const signature = sign.sign(this.privateKey);
    Chain.instance.addBlock(transaction, this.publicKey, signature);
  }
}

export default Wallet;
