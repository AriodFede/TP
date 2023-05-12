const Node = require('./node');
const Transaction = require('./transaction');
const CompositeTransaction = require('./compositeTransaction');

const node = new Node();

// const transaction1 = new Transaction('Tx-1', 'IN-1', 'TKN-1', 'A-1');
// const transaction2 = new Transaction('Tx-2', 'IN-2', 'TKN-2', 'A-2');
// const transaction3 = new Transaction('Tx-3', 'IN-3', 'TKN-3', 'A-3');

// const compositeTransaction = new CompositeTransaction();
// compositeTransaction.addTransaction(transaction1);
// compositeTransaction.addTransaction(transaction2);
// compositeTransaction.addTransaction(transaction3);

// node.createTransaction(compositeTransaction);

// console.log('Blockchain:', JSON.stringify(node.blockchain, null, 3));
// console.log('Blockchain:', JSON.stringify(node.blockchain, null, 1));
// console.log('Blockchain:', JSON.stringify(node.blockchain, null, 2));

// const transaction1 = new Transaction('address1', 'address2', 100);
// const transaction2 = new Transaction('address2', 'address1', 50);
// const transaction3 = new Transaction('address2', 'address1', 75);

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('my_private_key');

const transaction1 = new Transaction('address1', 'address2', 100);
transaction1.signTransaction(myKey);
myCoin.addTransaction(transaction1);

const transaction2 = new Transaction('address2', 'address1', 50);
transaction2.signTransaction(myKey);
myCoin.addTransaction(transaction2);

node.blockchain.addTransaction(transaction1);
node.blockchain.addTransaction(transaction2);

node.blockchain.minePendingTransactions('miner-address');

console.log('Transacciones en la cadena de bloques:');
for (let i = 0; i < node.blockchain.blocks.length; i++) {
  const block = node.blockchain.blocks[i];
  console.log(`Bloque ${i + 1}:`);
  for (let j = 0; j < block.transactions.length; j++) {
    console.log(`  Transacción ${j + 1}:`);
    console.log(`    ID: ${block.transactions[j].id}`);
    console.log(`    Inputs: ${JSON.stringify(block.transactions[j].inputs)}`);
    console.log(`    Outputs: ${JSON.stringify(block.transactions[j].outputs)}`);
    console.log(`    Timestamp: ${block.transactions[j].timestamp}`);
    console.log(`    Signature: ${block.transactions[j].signature}`);
  }
}