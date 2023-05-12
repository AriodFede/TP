const { ec } = require('elliptic');
const SHA256 = require('crypto-js/sha256');
const uuidV1 = require('uuid/v1');

class Wallet {
  constructor() {
    this.keyPair = ec.genKeyPair();
    this.privateKey = this.keyPair.getPrivate().toString(16);
    this.publicKey = this.keyPair.getPublic().encode('hex');
    this.balance = 0;
    this.transactions = [];
    this.id = uuidV1();
  }

  calculateBalance(blockchain) {
    let balance = 0;
    let transactions = [];

    blockchain.chain.forEach(block => {
      block.transactions.forEach(transaction => {
        if (transaction.outputs[0].address === this.publicKey) {
          transactions.push(transaction);
        }
      });
    });

    transactions.forEach(transaction => {
      if (transaction.inputs[0].address === this.publicKey) {
        balance -= transaction.inputs[0].amount;
      }

      transaction.outputs.forEach(output => {
        if (output.address === this.publicKey) {
          balance += output.amount;
        }
      });
    });

    this.balance = balance;
    return balance;
  }

  signTransaction(recipientAddress, amount) {
    if (amount > this.balance) {
      throw new Error('Fondos insuficientes');
    }

    const transaction = {
      id: uuidV1(),
      inputs: [{
        amount: this.balance,
        address: this.publicKey
      }],
      outputs: [{
        amount,
        address: recipientAddress
      }]
    };

    const hash = SHA256(JSON.stringify(transaction)).toString();
    const signature = this.keyPair.sign(hash, 'base64');
    transaction.signature = signature.toDER('hex');

    return transaction;
  }
}

module.exports = Wallet;