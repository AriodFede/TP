class Transaction {
  // ...

  addTransaction(transaction) {
    this.transactions.push(transaction);

    // Verificar si hay suficientes transacciones para formar una transacción compuesta
    if (this.transactions.length >= 9 && this.height < 2) {
      const compositeTransaction = new Transaction();
      compositeTransaction.addTransactions(this.transactions.splice(0, 9));
      this.addTransaction(compositeTransaction);
      this.height++;
    }
  }

  addTransactions(transactions) {
    this.transactions = transactions;
  }

  // ...
}

class Blockchain {
  // ...

  addTransaction(sender, recipient, amount) {
    const newTransaction = new Transaction(sender, recipient, amount);
    newTransaction.calculateHash();
    this.pendingTransactions.addTransaction(newTransaction);

    if (this.pendingTransactions.transactions.length === 11) {
      this.closeBlock();
    }
  }

  // ...
}

// Ejemplo de uso
const myBlockchain = new Blockchain();
const myNode = new Node(myBlockchain);

// Establecer el mecanismo de hashing a utilizar
myBlockchain.setHashingAlgorithm('SHA256');

// Crear transacciones simples
myNode.createTransaction('sender1', 'recipient1', 10);
myNode.createTransaction('sender2', 'recipient2', 20);

// Crear transacciones compuestas
const compositeTransaction1 = new Transaction();
compositeTransaction1.addTransaction(new Transaction('sender3', 'recipient3', 5));
compositeTransaction1.addTransaction(new Transaction('sender4', 'recipient4', 8));
compositeTransaction1.addTransaction(new Transaction('sender5', 'recipient5', 12));

const compositeTransaction2 = new Transaction();
compositeTransaction2.addTransaction(new Transaction('sender6', 'recipient6', 15));
compositeTransaction2.addTransaction(new Transaction('sender7', 'recipient7', 7));
compositeTransaction2.addTransaction(new Transaction('sender8', 'recipient8', 9));

myNode.createTransaction(compositeTransaction1);
myNode.createTransaction(compositeTransaction2);

// Minar transacciones pendientes y cerrar el bloque automáticamente
myNode.minePendingTransactions('minerAddress');
