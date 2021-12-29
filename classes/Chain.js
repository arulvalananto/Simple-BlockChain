"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = __importStar(require("crypto"));
const Block_1 = __importDefault(require("./Block"));
const Transaction_1 = __importDefault(require("./Transaction"));
class Chain {
    constructor() {
        this.difficulty = 4;
        this.chain = [
            new Block_1.default("null", new Transaction_1.default(100, "genesis", "satoshi")),
        ];
    }
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    mine(nonce) {
        let solution = 1;
        console.log("⛏️ mining...");
        while (true) {
            const attempt = crypto
                .createHash("MD5")
                .update((nonce + solution).toString())
                .digest("hex");
            if (attempt.substring(0, this.difficulty) ===
                Array(this.difficulty).join("0")) {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution++;
        }
    }
    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypto.createVerify("SHA256");
        verifier.update(transaction.toString());
        const isValid = verifier.verify(senderPublicKey, signature);
        if (isValid) {
            const newBlock = new Block_1.default(this.lastBlock.hash, transaction);
            this.chain.push(newBlock);
            Chain.instance.mine(newBlock.nonce);
        }
    }
}
Chain.instance = new Chain();
exports.default = Chain;
