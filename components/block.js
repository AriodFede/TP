const { v4: uuid } = require("uuid");
const Hashes = require("jshashes");
const addTransaction = require("./transaction");

class Transaction {
  constructor(from, to, amount) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}

class Block {
  constructor(transactions, previousHash) {
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.timestamp = new Date().getTime() / 1000;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const data =
      this.previousHash + this.timestamp + JSON.stringify(this.transactions);
    return new Hashes.SHA256().hex(data);
  }
}

class BlockChain {
  static blocks = new Set();
  static maxTransactions = 10;

  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    if (this.transactions.length < BlockChain.maxTransactions) {
      this.transactions.push(transaction);
    }
    if (this.transactions.length === BlockChain.maxTransactions) {
      const previousHash = this.getLastBlock()?.hash ?? "";
      const block = new Block(this.transactions, previousHash);
      BlockChain.blocks.add(block);
      this.transactions = [];
    }
  }

  getLastBlock() {
    return [...BlockChain.blocks].pop();
  }
}

module.exports = BlockChain;
