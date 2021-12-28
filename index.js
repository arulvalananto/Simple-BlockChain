require("dotenv").config({ path: ".env" });

const BlockChain = require("./BlockChain");
const Block = require("./Block");

const robbyCoin = new BlockChain();

robbyCoin.addBlock(
  new Block({ from: "7682368766", to: "9090907687", money: 1.09 })
);
robbyCoin.addBlock(
  new Block({ from: "Valan@gmail.com", to: "robby@gmail.com", money: 2.56 })
);

console.log(robbyCoin.isValidChain());
