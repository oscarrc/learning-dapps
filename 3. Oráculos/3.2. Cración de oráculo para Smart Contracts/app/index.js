// Llamada a las dependencias del proyecto
const Web3 = require('web3');
const fetch = require('node-fetch-commonjs');
const Transaction = require('@ethereumjs/tx').Transaction;

// Llamada a los archivos .json
const contractJSON = require('../build/contracts/Oracle.json');

// Instancia Web3
const web3 = new Web3("ws://127.0.0.1:7545");

// Dirección del contrato
const contractAddress = "0xC3e98aaE074A63e4BcFfb5a088f3994f64E78390";
// Instancia del contrato
const contractInstance = new web3.eth.Contract(contractJSON.abi, contractAddress);

// Información cuenta
// Dirección de la cuenta
const address = "0xB7c6E2715303c0F2D6658F1a28E7D70AfBFa531A";

// Buffer de la clave privada para la dirección anterior
// ESTO NO ES SEGURO, SÓLO PARA DESARROLLO
const privateKey = Buffer.from("a887fc277c558b9f7684d4ae45325669ebecb2f0be93bb869912b045ee49c575", "hex");

// Escuchamos evento para obtener el número de bloque
web3.eth.getBlockNumber().then( n => listenEvent(n-1) )

// Función que escucha el evento __callbackNewData a partir del último bloque
const listenEvent = (lastBlock) => {
    // Escuchamos el evento __callbackNewData y ejecutamos la función para actualizar datos
    contractInstance.events.__callbackNewData({}, {
        fromBlock: lastBlock,
        // toBlock: "latest" -> Explicado en el curso, pero la opción sólo es valida en getPastEvents
    }, 
    (error, event) => {
        if(error){ 
            console.log(error)
            return;
        }
        
        updateData();
    })
}

// Función que actualiza los datos
const updateData = () => {
    const startDate = "2022-01-01";
    const endDate = "2022-01-08";
    const apiKey = "DEMO_KEY";

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;

    // Obtenemos los datos de la api y los convertimos a JSON
    fetch(url)
        .then(res => res.json())
        .then(json => setContractData(json.element_count))
        .catch(err => console.log(err));
}

// Pasamos los datos al contrato mediante una transacción firmada con la clave privada
const setContractData = (data) => {
    // Obtenemos el índice de la transacción
    web3.eth.getTransactionCount(address, (err, txNum) => {
        // Llamamos a la función para cambiar el número de asteroides y estimamos el gas necesario
        contractInstance.methods.setNumAsteroids(data).estimateGas({}, (err, gasAmount) => {
            // Datos de la transacción
            const rawTx = {
                nonce: web3.utils.toHex(txNum), // Obtenemos el nonce
                gasPrice: web3.utils.toHex(web3.utils.toWei("1.4", "gwei")), // Pasamos el precio de gas
                gasLimit: web3.utils.toHex(gasAmount), // Límite de gas
                to: contractAddress, // Enviamos a la dirección del contrato
                value: '0x00', // Valor de la transaccion en Wei, en este caso 0
                data:  contractInstance.methods.setNumAsteroids(data).encodeABI() // Llamada a la función
            }

            // Creamos la transacción
            let tx = Transaction.fromTxData(rawTx);
            // Firmamos la transacción
            tx = tx.sign(privateKey);
            //Serializamos la transacción como string hexadecimal
            const serializedTx = tx.serialize().toString('hex');

            // Enviamos la transaccion firmada
            web3.eth.sendSignedTransaction(`0x${serializedTx}`);
        })
    })
}