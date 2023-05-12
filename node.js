const Blockchain = require('./blockchain');
const Block = require('./block');
const Transaction = require('./transaction');
const CompositeTransaction = require('./compositeTransaction');

class Node {
  constructor() {
    this.blockchain = new Blockchain();
    this.openBlock = new Block(Date.now(), []);
    this.hashingAlgorithm = 'MD5';
  }

  createTransaction(transaction) {
    this.openBlock.transactions.push(transaction);

    if (this.openBlock.transactions.length >= 10) {
      this.openBlock = new Block(Date.now(), []);
      this.blockchain.addBlock(this.openBlock);
    }
  }

  changeHashingAlgorithm(algorithm) {
    this.hashingAlgorithm = algorithm;
  }

  broadcast(block) {
    // Implement the broadcast logic here
  }
}

module.exports = Node;