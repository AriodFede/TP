const { v4: uuid } = require("uuid");
const { SHA256 } = require("jshashes");

class Transaction {
  static tokens = new Set();

  constructor(token, outputTransaction) {
    // Verificar si el token ya existe
    if (Transaction.tokens.has(token)) {
      this.token = token;
    } else {
      this.token = `TKN-${uuid()}`;
      Transaction.tokens.add(this.token);
    }

    this.id = uuid();
    this.outputTransaction = `A-${uuid()}`;

    // Generar un hash único para la transacción
    const hash = new SHA256().hex(
      this.id + this.token + this.outputTransaction
    );
    this.hash = hash;
  }
}

module.exports = Transaction;
