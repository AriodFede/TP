// const { MD5, SHA256 } = require('jshashes');
const SHA256 = require('crypto-js/sha256');
const { v1: uuidv1 } = require('uuid');

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.id = uuidv1().split('-').join('');
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.inputs = [];
    this.outputs = [];
  }

  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount + this.id).toString();
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('No se puede firmar una transacción de otra billetera');
    }

    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() {
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No se ha proporcionado una firma para esta transacción');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

module.exports = Transaction;