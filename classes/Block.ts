import * as crypto from "crypto";

import Transaction from "./Transaction";

class Block {
  public nonce: number = Math.round(Math.random() * 9999999999);

  constructor(
    public prevHash: string,
    public transaction: Transaction,
    public timestamp = Date.now()
  ) {}

  get hash() {
    const str = JSON.stringify(this);

    return crypto.createHash("SHA256").update(str).digest("hex");
  }
}

export default Block;
