const addTransaction = require("./components/transaction");
const BlockChain = require("./components/block");

// Creamos una instancia de BlockChain
const blockchain = new BlockChain();

// Generamos 25 transacciones utilizando la clase addTransaction y las agregamos a la instancia de BlockChain
for (let i = 0; i < 25; i++) {
  const transaction = new addTransaction();
  blockchain.addTransaction(transaction);
}

// Mostramos por pantalla la lista de transacciones y la lista de bloques
console.log("Transacciones:");
console.log(addTransaction.tokens);
console.log("Bloques:");
console.log([...BlockChain.blocks]);
