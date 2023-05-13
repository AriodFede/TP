-> Clase addTransaction
Representa una transacción en una blockchain. La clase tiene dos parámetros: token y outputTransaction, que representan el token y la transacción de salida respectivamente. El constructor de la clase genera un identificador único para la transacción, un token único en caso de que no exista todavía, una transacción de salida única y un hash único para la transacción utilizando el módulo CryptoJS. El constructor también verifica si el token ya existe en la blockchain utilizando un objeto Set para almacenar tokens únicos y reutilizarlos en lugar de crear nuevos tokens duplicados.




