// const { MD5, SHA256 } = require('jshashes');
const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, transactions, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  // calculateHash() {
  //   const hasher = new MD5(); // Change this to SHA256 if needed
  //   return hasher.hex(this.timestamp + this.previousHash + JSON.stringify(this.transactions));
  // }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Bloque minado: ${this.hash}`);
  }

}

module.exports = Block;