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

&nbsp;

**Imports de la dApp**

Comenzamos a editar el archivo App.js para importar los siguientes módulos:

* Librería `Web3`
* Helper `web3` (la que creamos en el apartado anterior)
* Contrato `Main` (abi)
* El hook useEffect y useState de react

```javascript
   import Web3 from 'web3';
   import web3 from './ethereum/web3';
   import main from './truffle/build/contracts/Main.json';
   import { useEffect } from 'react'
```

&nbsp;

**Instanciando web3, creando estado**

En la carga de la página, obtenemos web3 e instanciamos el contrato. Ésto lo hacemos en el hook `useEffect` con array de dependencias vacío, en el que llamamos a la función asíncrona `init`:

```javascript
   useEffect(() => {
      init();
   }, [])
```

También crearemos las siguientes variables de estado utilizando el hook `useState`:

```javascript
   const [ account, setAccount ] = useState('');
   const [ contract, setContract ] = useState(null);
   const [ contractAddress, setContractAddress ] = useState(null);
   const [ contractBalance, setContractBalance ] = useState(null);
   const [ amount, setAmount ] = useState(0);
   const [ loading, setLoading ] = useState(false);
   const [ error, setError ] = useState(null);
   const [ address, setAddress ] = useState('');
   const [ balance, setBalance ] = useState(0);
```

&nbsp;

**Compra de tokens**

Crearemos la función `buyTokens` que se encargará de realizar la compra de tokens. Esta función será asíncrona y modificará la variable de estado `loading` para indicar que se está realizando la compra. También modificará la variable de estado `error` para indicar si ha habido algún error.

```javascript
 await contract.methods.send_tokens(address, amount).send({ 
        from: account,
        value: window.web3.utils.toWei(amount.toString(), 'ether')
      })
```

Además modificaremos el layout para incluir un formulario para permitir la compra de tokens. Este formulario contará con:
* input Address de texto que al cambiar modifica la variable de estado `address`, a la que se enviarán los tokens
* input Amount de texto que al cambiar modifica la variable de estado `ammount`, que es la cantidad de tokens a comprar.
* button para enviar el formulario y realizar la compra

&nbsp;

**Visualizar balance de tokens de dirección**

Crearemos la funcion `getBalance` que se encargará de obtener el balance de tokens de la dirección indicada.

```javascript
   const balance = await contract.methods.balance_direccion(address).call();
```

**Visualizar total supply de tokens**

Crearemos la funcion `getTotalSupply` que se encargará de obtener el balance de tokens del smart contract.

```javascript
   const balance = await contract.methods.balance_total(address).call();
```

**Recibiendo ethers por nuestros tokens**

Para recibir ethers por nuestros tokens, modificaremos la funcion `send_tokens` para hacerla payable. Además, comprobaremos que el `msg.value`sea mayor o igual que el token.

```    
   function send_tokens (address _destinatario, uint _numTokens) public payable {
      // Código
      require(msg.value >= PrecioTokens(_numTokensW), "Compra menos tokens o paga con mas ethers");
```

Además incluiremos una función para calcular el precio de los tokens. Para mantenerlo sencillo, un token, un ether.

```solidity
function PrecioTokens(uint _numTokens) internal pure returns (uint) {
        // Conversion de Tokens a ethers: 1 token -> 1 Ether
        return _numTokens*(1 ether);
    }
```

**Despliegue de la Dapp en Rinkeby con Infura**

Para desplegar la dApp en Rinkeby utilizaremos un nodo de [Infura](https://infura.io). Infura nos proporcionará un nodo al que conectaremos nuestro proyecto.

Una vez creada la cuenta crearemos un nuevo projecto de Ethereum:

1. Cambiamos el Endpoint a `rinkeby`
2. Anotamos la URL del endpoint `https://rinkeby.infura.io/v3/<PROJECT_ID>`
3. Instalamos las dependencias:

   ```bash
      npm install --save-dev @truffle/hdwallet-provider
   ```

4. Modificamos el archivo `truffle-config.js`
   4.1. Añadimos las dependencias
   
   ``` javascript
      const HDWalletProvider = require('@truffle/hdwallet-provider');
      const fs = require('fs');
      const mnemonic = fs.readFileSync(".secret").toString().trim();
   ```

   4.2 Añadimos la red `rinkeby`

   ```javascript
      rinkeby: {
         provider: () => {
         return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/<PROJECT_ID>");
         },
         network_id: 4,
         gas: 4500000,
         gasPrice: 10000000000,
      }
   ```

5. Creamos el archivo `.secret` con la [mnemonic](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) de la cuenta de Metamask que utilizaremos.

A continuación, compilamos los contratos y los desplegamos en dicha red:

```bash
   truffle compile
   truffle migrate --network rinkeby
```

Con esto tendríamos la dApp desplegada en Rinkeby utilizando un nodo de Infura.

Ahora podemos iniciar nuestra app y veremos las peticiones en el panel de control de Infura.

---

&nbsp;

### 5.4. Binance Smart Chain

&nbsp;

Binance Smart Chain (BSC) es la cadena de bloques que funciona en paralelo a Binance Chain. En este caso BSC se orienta a los contratos inteligentes, permitiendo que se pueda operar sobre aplicaciones descentralizadas en una plataforma sin permisos.

Binance Smart Chain se lanzó a finales del año 2020 orientada a albergar alternativas de menor coste para la gestión de finanzas descentralizadas. Destaca por una velocidad elevada con tiempo de bloque en torno a los 5 segundos.

Permite realizar transferencias de activo entre cadenas de bloques, siendo compatible con EMV. La gestión utiliza Prueba de Participación Autorizada.

El funcionamiento de Binance Smart Chain, aunque es independiente a Binance Chain y funciona en paralelo, permite que ambas cadenas sean compatibles. Esto significa, que será posible la transferencia de activos digitales de una cadena de bloques a otra.

Binance Smart Chain utiliza un token BEP-20. Se trata del mismo tipo de Token que el ERC-20 de Ethereum. BEP-20 es un Token orientado a facilitar el desarrollo de activos digitales que sean fungibles en la propia cadena de bloques.

Además, también es posible movilizar otros activos digitales de otras cadenas en dirección a Binance Smart Chain, utilizando para ello activos puente basados en el BEP-20. De esta manera, se puede, por ejemplo, operar con Bitcoin a través de un token vinculado.

&nbsp;

**Añadir BSC a Metamask**

Metamask -> Redes -> Agregar red

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

**Despliegue de la dApp en BSC**

1. Añadimos las dependencias del `truffle-config.js`
   
   ``` javascript
      const HDWalletProvider = require('@truffle/hdwallet-provider');
      const fs = require('fs');
      const mnemonic = fs.readFileSync(".secret").toString().trim();
   ```

2. Añadimos la network al apartado `networks` del `truffle-config.js`:

   ```javascript
      bscTestnet: {
         provider: () => {
         return new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545");
         },
         network_id: 97,
         confirmations: 10,
         timeout: 200,
         skipDryRun: true
      }
   ```

3. Migramos los contratos:
   
   ```bash
      truffle migrate --network bscTestnet
   ```

---

&nbsp;

### 5.5. dApp Lotería ERC20

&nbsp;

**Smart contract**

&nbsp;

Creación de un sistema de loterías basado en blockchain para evitar el fraude.

* El sistema de loterías utilizará tokens
  * Los boletos se comprarán en tokens ERC20
  * Los premios se repartirán en tokens ERC20
  * Los tokens podrán cambiarse por Ethers
* El contrato tendrá un owner que
  * Almacenará el bote del contrato
  * Transferirá el bote al ganador
* El usuario
  * Podrá comprar tokens
  * Podrá comprar boletos con tokens
  * Podrá cambiar tokens por ethers

&nbsp;

**dApp Frontend**

En primer lugar creamos el layout de nuestra app al igual que en el punto anterior. Separamos `Header`y `Footer` en sus componentes individuales e instalamos `react-router-dom` para poder utilizar las rutas.

```bash
   npm install --save react-router-dom
```

Además, crearemos componentes individuales para cada una de las rutas que estableceremos cómo a continuación:

```javascript
   <div className="d-flex flex-column min-vh-100">      
      <Router>       
        <Header account={account} />
        <Container fluid className="my-5 flex-grow-1"> 
          <main className="row d-flex flex-column justify-content-center align-items-center">
            <Routes>
              <Route path="/" element={<Tokens />} />
              <Route path="lotto" element={<Lotto />} />
              <Route path="winners" element={<Winners />} />
            </Routes>
          </main>
        </Container>
        <Footer contractAddress={contractAddress} />      
      </Router>
    </div>
```

Por último en App.js inicializaremos web3 y el contrato de lotería:

```javascript
   const init = async () => {
    // Inicialización de web3
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
    }else{
        console.log("Non-Ethereum browser detected");
        return;
    }

    // Obtener cuenta
    const accounts = await window.web3.eth.getAccounts();
    setAccount(accounts[0]);

    // Obtener network
    const networkId = await window.web3.eth.net.getId();
    const networkData = await lotto.networks[networkId];

    if(networkData) {
      const abi = lotto.abi;
      const address = networkData.address;
      const instance = new window.web3.eth.Contract(abi, address);
      setContract(instance);
      setContractAddress(instance.options.address);
    }else{
      console.log("Smart contract not deployed to detected network");
      return;
    }
  }
```

&nbsp;

**Gestión de tokens**

Creamos una función asíncrona para la compra de tokens envuelta en un try...catch.

```javascript
   const getTokens = async (to, amount, ethers) => {
        setLoading(true);
        setError('');
        
        try{
            await contract.methods.buyTokens(to, amount).send({
                from: account,
                value: window.web3.utils.toWei(ethers, 'ether')
            });
        }catch(err){
            setError(err.message)
        }finally{
            setLoading(false);
        }
   }
```

Así como un formulario el cual recibirá los datos del usuario y llamará a la función para comprar tokens.

Del mismo modo crearemos funciones y formularios para:
* Comprobar el balance de tokens de una cuenta
* Comprobar el balance de tokens del contrato
* Incrementar los tokens disponibles del contrato

&nbsp;

**Gestión de boletos**

En esta página crearemos formularios que permitan al usuario:
* Comprar boletos
* Ver boletos comprados
* Ver el total del bote
* Ver precio de un boleto

&nbsp;

**Gestión de ganadores**