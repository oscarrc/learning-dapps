# CURSO DAPPS Y NFT EN ETHEREUM
## 3. Oráculos

&nbsp;

### 3.1. Conceptos teóricos de los oráculos

&nbsp;

**Qué es un oráculo**

Un oráculo es un servicio que envía información del mundo real a un smartcontract. Actuan cómo pasarela entre la blockchain e Interet para obtener información externa de varias fuentes verificándola para crear un consenso.

De este modo informan a la red blockchain de sucesos exteriores permitiendo a un smart contract actuar en función de la información recibida.

&nbsp;

**Tipos de oráculos**

* *Oráculos software* - maneja información en línea. Extraen y ordenan información en línea (p.ej. el clima, resultados, horarios, etc)
* *Oráculos hardware* - rastrean objetos del mundo real. Extraen información de sensores (p.ej. llegada de un autobús, cruce de una barrera, escaneo de un código de barras, etc)
* *Oráculos entrantes* - Proveen de información externa a la blockchain
* *Oráculos salientes* - Proveen a la blockchain la posibilidad de enviar datos al exterior.
* *Oráculos de consenso* - Recopilan información de distintas fuentes para verificar la información y crear un consenso con la información recibida.

&nbsp;

**Oráculos en Bitcoin. Lightning network**

Lightning network es un oráculo simple desarrollado por el MIT pensado para mejorar la escalabilidad de la red Bitcoin y permite transacciones instantáneas.

[Lightning Network](https://lightning.network/)

&nbsp;

**Características de los oráculos**

* *Privacidad* - Los oráculos no pueden saber si se ha iniciado un smart contract o su información ha sido incluída en la blockchain. Por ello antes de introducir información a la blockchain se utiliza un mezclador para desacoplarla.
* *Conectividad* - Los oráculos permiten a los smart contracts conectar con proveedores de datos externos a la blockchain.
* *Servicio centralizado* - Los oráculos obtienen información de servicios centralizados **de confianza**. 
* *Monetización* - Los oráculos deben ser monetizados a modo de incentivo para los desarrolladores.
  
&nbsp;

**Riesgos y oráculos descentralizados**

Los oráculos han sido concebidos como una pieza bajo un control centralizado lo que se aleja del modelo descentralizado por el que aboga blockchain. 

Cuando se utiliza un oráculo se está confiando plenamente en una entidad centralizada que controla la información. Esta entidad puede tener intenciones oscuras o bien ser hackeada comprometiendo la veracidad de la información.

Para evitar esto se crearon los oráculos descentralizados que obtinene información de varios oráculos y comunica a la blockchain la información que se considere  confiable.

**Augur** y **ChainLink** son oráculos descentralizados para la red Ethereum.

[Augur](https://augur.net/) es una plataforma de mercado de predicción descentralizada.

[ChainLink](https://chain.link/) es un servicio de oráculo descentralizado para conectar smart contracts con el mundo real ofreciendo recompensas e incentivos a los participantes en la red.

---

&nbsp;

### 3.2. Cración de oráculo para Smart Contracts

&nbsp;

Realización de un oráculo para enlazar la [API de la NASA](https://api.nasa.gov/) con un smart contract.
Utilizaremos la api Asteroids NeoWS para recopilar información acerca de los asteroides caidos a la tierra.

El endpoint que estaremos utilizando es:

`GET https://api.nasa.gov/neo/rest/v1/feed?start_date=START_DATE&end_date=END_DATE&api_key=API_KEY`

&nbsp;

**Programación del Smart Contract**

Creamos un nuevo workspace en Ganache para el proyecto y a continuación:

1. Inicialización del proyecto Truffle. `truffle init`
2. Creamos el contrato con `truffle create contract oracle`
3. Variables y funciones
   * Variables para almacenar el owner del contrato y el número de asteroides
   * Funciones para actualizar el número de asteroides con información del oráculo y otra para hacerlo manualmente
   * Evento a emitir para recibir información del oráculo
   * Modificador onlyOwner
4. Compilación y migración del contrato: `truffle migrate`

El contrato recibirá datos del oráculo para ello haremos uso del evento `__callbackNewData();`.

&nbsp;

**Desarrollo del oráculo con Javascript**

Creamos el directorio `app` no situamos en él e inicializamos el proyecto con `npm init`.
    * En la seccion scripts, definimos el script "*start*" cómo `node --experimental-json-modules index.js`

A continuación instalamos las siguientes dependencias con `npm install`:
* web3
* @ethereumjs/tx
* node-fetch

Creamos el archivo `index.js` y comenzamos a programar el oráculo.

El flujo general sería:
1. Instanciamos el contrato
   `web3.eth.contract(contractJSON.abi, addressContract);`

2. Escuchamos el evento __calbackNewData
   `contractInstance.events.__callbackNewData({}, { fromBlock, toBlock })`

3. Obtenemos datos de la API

4. Generamos la transacción y la firmamos
   `Transaction.fromTxData(rawTx).sign(privateKey);`

5. Enviamos la transacción serializada a la dirección del contrato
   `web3.eth.sendSignedTransaction(`0x${serializedTx}`);`

Finalmente iniciamos el proyecto con `npm start`.