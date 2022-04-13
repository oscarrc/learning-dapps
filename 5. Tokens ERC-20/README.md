# CURSO DAPPS Y NFT EN ETHEREUM
## 5. Tokens NFT (ERC-20)

&nbsp;

### 5.1. Introducción a los tokens ERC-20

&nbsp;

Especificación para estándarizar la interfaz de creación y emisión de nuevos tokens en la red Ethereum, asegurando su compatibilidad e interoperatibilidad. Es decir provee de:
* Uniformidad en la programación por medio de un API estándar.
* Complejidad de programación reducida.
* Interoperabilidad con la red.
* Menor complijedad en la compresión de cada token implementado.
* Mayor seguridad.
* Menor riesgo de romper contratos.

&nbsp;

**Características principales de un token ERC-20**

* Tienen un nombre o id y un símbolo asociado.
* Gestión de aspectos económicos de su emisión.
* Control de balances
* Gestión de transferencias
* Gestión de retiros parciales de fondos
---
&nbsp;

### 5.2. Creación y uso de un token ERC-20

&nbsp;

Implementación y uso de un token ERC-20, así como su uso en la blockchain.

Implementaremos una interfaz para el token con:
* Métodos (operaciones básicas a realizar con el token)
   * `totalSupply` - devuelve el total de tokens en circulación
   * `balanceOf` - devuelve la cantidad de tokens de una cartera
   * `allowance` - devuelve el número de tokens que el *spender* podrá gastar en nombre del *owner* (permitimos que una persona gaste los tokens de otra persona).
   * `transfer` - devuelve un valor booleano con el resultado de la transferencia
   * `approve` - devuelve un valor booleano resultado del gasto de tokens
   * `transferFrom` - devuelve un valor booleano resultado del traspaso de tokens usando el método allowance
   * `transferFromTo` - devuelve un valor booleano resultado del traspaso de tokens entre las direcciones pasadas como parámetro (ADICIONAL, NECESARIO EN FUTURAS SECCIONES) 

* Eventos (notifican de las operaciones realizadas con los tokens)
   * `Transfer` - Se emite cuando una cantidad de tokens pasa de un origen a un destino
   * `Approval` - Se emite cuando se establece una asignación con el método allowance

Habrá un número de tokens finito, `totalSupply`.
* Extra: Solo el owner del contrato podrá incrementar el totalSupply.

**Decimales**: Cómo Solidity no trabaja con float, los números serán enteros y la constante `decimals` definirá el número de decimales es decir:
* `10000` con dos decimales equivaldría a `100.00`


&nbsp;

**Creacion cartera Metamask**

1. Crear una cartera Metamsk.
2. Añadir redes (Test o mainnet).
3. Proceder a los despliegues.

&nbsp;


**Despliegue en BSC**

Binance Smart Chain (BSC), nace para cubrir la necesidad de transacciones más rápidas.

| | Mainnet | Testnet |
| -- | -- | -- |
| ID | 56 | 97 |
| Nombre | Smart Chain | Smart Chain - Testnet |
| Divisa | Binance | Binance |
| Simbolo | BNB | BNB |
| Decimales | 18 | 18 |
| URL RPC | https://bsc-dataseed.binance.org | https://data-seed-prebsc-1-s1.binance.org:8545/ |
| URL Explorer | https://bscscan.com | https://testnet.bscscan.com |

[Binance Smart Chain Testnet faucet](https://testnet.binance.org/faucet-smart)

&nbsp;

1. Desplegar con REMIX utilizando Injected Web3, en la red testnet.
2. Importar token a Metamask
   * Nombre del token
   * Dirección del contrato
   * Simbolo del token
   * Decimales de precisión
3. Operar con los tokens normalmente
4. Si necesitamos actualizar el contrato, podemos desplegarlo en REMIX utilizando *At address* y la dirección de nuestro contrato

&nbsp;

**Dirección del contrato desplegado**: `0xb35ae44c13466f22fb44979B62de23A70FC90084`

&nbsp;

**Despliegue en Polygon**

Polygon (MATIC) es una *sidechain* que nace de la necesidad de reducir los constes de transacción de la red Ethereum

| | Mainnet | Testnet |
| -- | -- | -- |
| ID | 137 | 80001 |
| Nombre | Polygon Mainnet | Matic Mumbai Testnet |
| Divisa | MATIC | MATIC |
| Simbolo | MATIC | MATIC |
| Decimales | 18 | 18 |
| URL RPC | https://polygon-rpc.com/ | https://rpc-mumbai.maticvigil.com/|
| URL Explorer | https://polygonscan.com/ | https://mumbai.polygonscan.com/ |

[Mumbai Testnet Faucet](https://faucet.polygon.technology/)


&nbsp;

1. Desplegar con REMIX utilizando Injected Web3, en la red testnet.
   * EL despliegue de un ERC-20 en Polygon no tendrá en cuenta el balance. Al ser una sidechain sobre Ethereum, tardará un rato
2. Importar token a Metamask
   * Nombre del token
   * Dirección del contrato
   * Simbolo del token
   * Decimales de precisión
3. Operar con los tokens normalmente
4. Si necesitamos actualizar el contrato, podemos desplegarlo en REMIX utilizando *At address* y la dirección de nuestro contrato

&nbsp;

**Dirección del contrato desplegado**: `0xb35ae44c13466f22fb44979B62de23A70FC90084`

---

&nbsp;

### 5.3. Dapp con tokens ERC-20

Creación de una Dapp con tokens ERC-20 que, desde una interfaz web, permitirá:

1. Comprar tokens
2. Consultar el balance total de tokens de una cuenta
3. Consultar el blance total de tokens del contrato
4. Añadir nuevos tokens, aka. incrementar totalSupply

&nbsp;

**Creación del Smart Contract**

A partir del smart contract creado en la sección anterior, crearemos un contrato Main para interactuar con éste, mediante las siguientes funciones:

* `getOwner` - obtiene propietario del contrato
* `getContract` - obtiene la dirección del contrato
* `PrecioTokens` - interna. Devuelve el precio de una cantidad de tokens
* `sendTokens` - envía tokens a una dirección a cambio de ethers
* `GenerateTokens` - incrementa el total supply de tokens. Solo accesible por el propietario.
* `balance_direccion` - devuelve el balance de una dirección
* `balance_total` - devuelve el balance total de tokens del smart contract.

&nbsp;

**Inicialización de la App**

1. Inicializamos la aplicación React:
    
    `npx create-react-app dapp-erc20`

2. Instalamos las dependencias:
    
    ```bash
    cd dapp-nft
    npm install --save bootstrap react-bootstrap truffle web3
    npm install --save-dev chai chai-as-promised chai-bignumber @openzeppelin/contracts
    ``` 
3. Si utilizamos webpack versión 5 o superior:
  * Instalamos las siguientes dependencias:

    ```bash
    npm install --save-dev react-app-rewired crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url buffer process
    ```
  * Creamos un override para webpack > 5. `config-overrides.js`.
  * Cambiamos `react-scripts` por `react-app-rewired` en el `package.json`

5. Inicializamos Truffle

  `truffle init`

6. Editamos la configuración de Truffle:

  ```json
    {  
      contracts_directory: './src/truffle/contracts/',
      contracts_build_directory: './src/truffle/build/',
      migrations_directory: './src/truffle/migrations/',
      networks: {
        development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*",
        },
      },
      mocha: {},
      compilers: {
        solc: {
          version: "0.8.11",
          settings: {   
          optimizer: {
            enabled: false,
            runs: 200
          },
          }
        }
      }
    }
  ```

  6. Movemos la carpeta contracts a `src/contracts`

&nbsp;

**Fase de test**

Testearemos todas las funciones públicas del smart contract, asegurandonos una cobertura del 100%.
Ver `test/main.test.js`

* Testeamos getOwner
* Testeamos send_tokens
   * Testeamos balance_direccion
   * Testeamos balance_total
* Testeamos GeneraTokens

&nbsp;

**Web 3**

En el directorio de la dapp creamos el archivo `src/ethereum/web3.js` en el que importaremos e instanciarmos Web3.

```javascript
   import Web3 from "web3";

   let web3;

   if(window.web3) {
      web3 = new Web3(window.web3.currentProvider);
   }

   window.addEventListener("load", async () => {
      if(window.ethereum) {
         window.web3 = new Web3(window.ethereum);

         try{
               await window.ethereum.request({ method: 'eth_requestAccounts' })
         }catch(err){
               console.log(err);
         }
      }else if(window.web3){
         window.web3 = new Web3(window.web3.currentProvider);
      }else{
         console.log("Non-Ethereum browser detected");
      }
   })

   export default web3;
```