const Block = require('./block');
const Transaction = require('./transaction');

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.blocks = [new Block(0, Date.now(), [], '0')];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  addBlock(block) {
    this.blocks.push(block);
  }

  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress) {
      throw new Error('La transacción debe incluir una dirección de origen y una dirección de destino');
    }

    if (!transaction.isValid()) {
      throw new Error('No se puede agregar una transacción no válida a la cadena de bloques');
    }

    this.pendingTransactions.push(transaction);
  }

  validateIntegrity() {
    for (let i = 1; i < this.blocks.length; i++) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward);
    this.pendingTransactions.push(rewardTx);

    const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    console.log('Bloque minado correctamente');
    this.chain.push(block);

    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block(0, '01/01/2022', 'Genesis block', '0');
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  printChain() {
    console.log('Transacciones en la cadena de bloques:');

    for (let i = 0; i < this.chain.length; i++) {
      const block = this.chain[i];
      console.log(`Bloque ${i + 1}:`);

      for (let j = 0; j < block.transactions.length; j++) {
        const transaction = block.transactions[j];
        console.log(`  Transacción ${j + 1}:`);
        console.log(`    ID: ${transaction.id}`);
        console.log(`    Inputs: ${JSON.stringify(transaction.inputs)}`);
        console.log(`    Outputs: ${JSON.stringify(transaction.outputs)}`);
        console.log(`    Timestamp: ${transaction.timestamp}`);
        console.log(`    Signature: ${transaction.signature}`);
      }
    }
  }


}

module.exports = Blockchain;