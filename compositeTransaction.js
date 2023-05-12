const Transaction = require('./transaction');

class CompositeTransaction {
  constructor() {
    this.transactions = [];
  }

  addTransaction(transaction) {
    if (this.transactions.length < 3) {
      this.transactions.push(transaction);
    } else {
      throw new Error('CompositeTransaction can only hold up to 3 transactions.');
    }
  }

  calculateHash(algorithm) {
    return this.transactions.map(tx => tx.calculateHash(algorithm)).join('');
  }
}

module.exports = CompositeTransaction;