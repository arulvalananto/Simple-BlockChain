require("dotenv").config({ path: ".env" });
const crypto = require("crypto");
const Block = require("./Block");

const BlockChain = require("./BlockChain");

const robbyCoin = new BlockChain();

robbyCoin.addBlock(
  new Block({
    from: "valan@gmail.com",
    to: "anto@gmail.com",
    money: 1.09,
  })
);

robbyCoin.addBlock(
  new Block({
    from: "valan@gmail.com",
    to: "anto@gmail.com",
    money: 1.09,
  })
);
