require("dotenv").config({ path: ".env" });
const EC = require("elliptic").ec;

const Block = require("./classes/Block");
const BlockChain = require("./classes/BlockChain");
const Transaction = require("./classes/Transaction");

const ec = new EC("secp256k1");
const myKey = ec.keyFromPrivate(
  "5f8a1969d56aadbb1aa2a14210bbb671db41c4d5a507c2e69121a390bbbfc330"
);
const myWalletAddress = myKey.getPublic("hex");

const robbyCoin = new BlockChain();

const tx1 = new Transaction(myWalletAddress, "payee public key goes here", 10);
tx1.signTransaction(myKey);
robbyCoin.addTransaction(tx1);

robbyCoin.minePendingTransactions(myWalletAddress);

console.log(robbyCoin.getBalance(myWalletAddress));
console.log(robbyCoin.getBalance("payee public key goes here"));

robbyCoin.minePendingTransactions(myWalletAddress);

console.log(robbyCoin.getBalance(myWalletAddress));
