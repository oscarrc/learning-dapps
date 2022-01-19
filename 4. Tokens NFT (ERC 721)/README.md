# CURSO DAPPS Y NFT EN ETHEREUM
## 4. Tokens NFT (ERC-721)

&nbsp;

### 4.1. Introducción a los tokens NFT

&nbsp;

**Qué es la fungibiliad**

Fungible es algo que se consume con el uso. Habitualmente los bienes fungibles son intercambiables, es decir, una criptomoneda cómo ETH es fungible, se puede gastar, y es idéntica a cualquier otro ETH en existencia.

En el caso de los tokens no fungibles esto no es así, un NFT es un token único y singular.

&nbsp;

**Qué son los Tokens No Fungibles**

Los NFT son un tipo de token que permite una forma flexible de representar activos no fungibles en blockchain. Los NFT:
* Son únicos
* Son rastreables y verficables (registro de transacciones)
* Son escasos y raros (esto los hace deseables ya que la oferta no supera a la demanda)
* Son indivisibles (no pueden negociarse de forma fraccionada)
* Son programables (pueden ser programados para modificar su comportamiento)

&nbsp;

**Qué es un token ERC-721**

El token ERC-721 es un tipo de token creado para la red Ethereum creado con el objetivo de crear tokens intercambiables, únicos, no fungibles e indestructibles. 

Esto hace que el valor intrínseco este estrechamente relacionado con la escasa oferta y su rareza, lo que hace que puedan ser vistos cómo coleccionables; esperándose que su valor aumente con el tiempo debido a su singularidad.

&nbsp;

**Características de los tokens ERC-721**

* Tienen un nombre (utilizado para indicar a contratos y apps la denominación del token)
* Tienen definido un símbolo
* Tienen definido el suministro total del token
* Tienen un campo para indicar el balance de tokens en una dirección
* Tienen funciones de propietario (propiedad, transferencia...)
* Tienen un campo propietario que garantiza su identificación criptográfica y su no fungbiliad
* Tienen un campo aprobación, otorga permiso a otra entidad para realizar una transferencia
* Tienen definido un campo de toma de posesión.
* Permite el envío de tokens entre usuarios
* Tienen un campo token del propietaro por índice que permite hacer el seguimiento de los tokens por medio de un id único
* Cuenta con un campo de metadatos del token con propiedades que lo distinguen del resto
* No permiten operaciones de *allowance*

&nbsp;

**Principales diferencias entre ERC-721 y ERC-20**

| ERC-721 | ERC-20 |
| --- | --- |
| Son no fungibles | Son fungibles |
| No son fraccionables | Pueden ser fraccionados |
| Son únicos | Cada token es igual a los demás |

&nbsp;

**Usos y aplicaciones de los tokens ERC-721**

* Creación de coleccionables
* Dessarrollo de juegos play to earn
* Adjudicación criptográfica de propiedades
* etc.

---
&nbsp;

### 4.2. Creando tokens NFT con Solidity

&nbsp;

En lugar de programar línea a línea un token ERC-721 completo, podemos utilzar la librería @openzeppelin. Los contratos utilizados en esta sección se encuentran en *0. Utils/ERC721Full.sol*

`npm install @openzeppelin/contracts`

&nbsp;

**Las interfaces de ERC-165 y ERC-721**

Los tokens [ERC-721](https://eips.ethereum.org/EIPS/eip-721) heredan de [ERC-165](https://eips.ethereum.org/EIPS/eip-165). La interfaz IERC165 (*@openzeppelin/contracts/introspection/IERC165.sol*) define la función `supportsInterface` que devuelve un booleano en caso de que implemente correctamente la interfaz pasada cómo parámetro.

Por su parte, la interfaz IERC721 (*@openzeppelin/contracts/token/ERC721/IERC721.sol*) define los eventos eventos y métodos que debe implementar el token:
* Eventos:
  * `Transfer`: se emite cuando un token es transferido desde una dirección a otra
  * `Approval`: se emite cuando se aprueba la transferencia de un token desde el owner a la dirección aprobada.
  * `ApprovalForall`: se emite cuando todas las transacciones de un owner se han completado o no (bool).
* Funciones (todas ellas son públicas):
  * `balanceOf`: devuelve balance de NFTs de una dirección.
  * `ownerOf`: devuelve el propietario de un token.
  * `safeTransferFrom`: transfiere un token de una dirección a otra. Si el caller no es from, la transferencia debe ser aprobada.
  * `transferFrom`: transfiere un token entre cuentas. Si el caller no es from, la transferencia debe ser aprobada.
  * `approve`: aprueba una transferencia.
  * `getApproved`: devuelve quien es el operador de un token determinado.
  * `setApprovalForAll`: ajusta la aprobación de un operador para transferencias en curso.
  * `isApprovedForAll`: consulta si se han aprobado todas las transferencias de un propietario a un operador.
  * `safeTransferFrom`: overload de `safeTransferFrom` que incorpora los datos que se emiten cómo parte de la transacción.

&nbsp;

**Validación de la recepción del token NFT**

Si un contrato quiere soportar *safeTransfer* debe implementar `IER721Receiver` (*@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol*).

Este contrato gestiona la recepción deun NFT. Este smart contract cuenta con la función `onERC721Received` que será llamada desde el contrato ERC-721 cuando una transferencia se complete, es decir, el receptor es efectivamente el propietario del token.

Esta función debe devolver el selector de la transacción obtenido mediante `this.onERC721Received.selector`. Si la transacción no es correcta o no se devuelve el selector la transacción será revertida.

&nbsp;

**Validación de direcciones de contrato**

La librería `Address` (*@openzeppelin/contracts/utils/Address.sol*) contiene la función `isContract` que devuelve un booleano en función de si la cuenta es un contato o no. No ejecuta comprobación exhaustiva por lo que puede haber un pequeño porcentaje de falsos negativos (p.ej. cuando desplegamos un contrato y las funciones del constructor no han terminado de ejecutarse).

&nbsp;

**Librería de contadores**

La librería `Counters` (*@openzeppelin/contracts/drafts/Counters.sol*) provee contadores que sólo pueden incrementar/decrementar una unidad. Ésto puede ser utilizada para contar el número de elementos en un mapping, generación de ids para ERC-721, etc. Contiene las funciones:
* `current`: Devuelve el valor del contador pasado como parámetro
* `increment`: Incrementa el contador pasado cómo parámetro
* `decrement`: Decrementa el contador pasado cómo parámetro

&nbsp;

**Smart Contract ERC-165**

Este contrato contará con una constante que identifica la interfaz:
* `bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;`

Las interfaces soportadas se guardan en un mapping:
* `mapping(bytes4 => bool) private _supportedInterfaces;`

En el constructor del contrato, que será *internal*, añadiremos la interfaz actual al mapping, mediante una llamada a la función register interface:
* `registerInterface(_INTERFACE_ID_ERC165);`

Contará también con la función `supportsInterface` que devuelve un booleano resultado de buscar en el mapping la interface pasada cómo parámetro.

El resultado de `bytes4(keccak256('supportsInterface(bytes4)'))` será igual al Id de la interfaz.

&nbsp;

**Smart Contract ERC-721**

Un token ERC-721 implementa las interfaces `IERC165` e `IERC721`.

Dfiniremos también el identificador `bytes4 private constant _ERC721_RECEIVED` cómo:

`bytes4(keccak256('onERC721Received(address,uint256,bytes)'))`

o bien 

`IERC721Receiver(0).onERC721Received.selecto`

También utilizaremos el `bytes4 private constant _INTERFACE_ID_ERC721` para identificar la interfaz, obtenido mediante combinación binaria de:

```
    bytes4(keccak256('balanceOf(address)')) == 0x70a08231
    bytes4(keccak256('ownerOf(uint256)')) == 0x6352211e
    bytes4(keccak256('approve(address,uint256)')) == 0x095ea7b3
    bytes4(keccak256('getApproved(uint256)')) == 0x081812fc
    bytes4(keccak256('setApprovalForAll(address,bool)')) == 0xa22cb465
    bytes4(keccak256('isApprovedForAll(address,address)')) == 0xe985e9c
    bytes4(keccak256('transferFrom(address,address,uint256)')) == 0x23b872dd
    bytes4(keccak256('safeTransferFrom(address,address,uint256)')) == 0x42842e0e
    bytes4(keccak256('safeTransferFrom(address,address,uint256,bytes)')) == 0xb88d4fde
```

Para posteriormente registrarlo en el constructor con el método `_registerInterface`;

Para almecenar información, utilizaremos los siguientes mapeos:
* `mapping (uint256 => address) private _tokenOwner;` - tokenId con propietario del token
* `mapping (uint256 => address) private _tokenApprovals;` - tokenId con direcciones aprovadas
* `mapping (address => Counters.Counter) private _ownedTokensCount;` - Propietario con número de tokens
* `mapping (address => mapping (address => bool)) private _operatorApprovals;` - Direcciones de propietario a mapping de operadores aprobados.

Además de ésto, implementaremos las funciones definidas en las interfaces. Además de los siguientes métodos internos:
* `_exists` - Devuelve un booleano si el token existe
* `_isApprovedOrOwner` - comprueba si la dirección pasada como parámetro es el propietario o está aprobado
* `_mint` - Mintea un token
  * El token no debe existir
  * La dirección to debe ser distinta de 0
  * Establecemos el token owner a to
  * Incrementamos el conteo de tokens del owner
  * Emitimos evento transfer
* `_burn` - Quema un token
  * El token debe pertenecer a la dirección
  * Llamamos a _clearApproval
  * Decrementamos el conteo de tokens del owner
  * Establecemos el token owner a la dirección 0
  * Emitimos evento transfer
* `_transferFrom` - Transfiere la propiedad de un token
  * Limpiamos la aprovacion con `_clearAproval`
  * Decrementamos el token count del from
  * Aumentamos el token count del to
  * Asignamos la propiedad del token al to
  * Emitmios el evento transfer
* `_checkOnERC721Received` - Deprecada. Invoca `onERC721Received` en la dirección de destino  
* `_clearApproval` - elimina una aprovación para un token. Asigna aprovación a la dirección 0

>NOTA: Hay que tener en cuenta que el owner del NFT será siempre el que lo mintee. El resto de transferencias se realizarán mediante cuentas aprobadas con el método `approve`.

&nbsp;

**Smart Contract ERC-721 Enumerable**

El token ERC-721 Enumerable es un token que cuenta con un totalSupply. Requiere las siguientes funciones:
* `totalSupply` - Cantidad total de tokens
* `tokenOfOwnerByIndex` - Token de un propietario por índice
* `tokenByIndex` - Token por índice

Y los siguientes array y mappigns:
* `_allTokens` - Array que contiene los tokenIds
* `_ownedTokens` - Mapping que elaciona propietario con tokens que posee
* `_ownedTokensIndex` - Mapping que a partir del token id devuelve el ínidice en la lista de tokens del propietario
* `_allTokensIndex` - Mapping que relaciona el tokenId con la posición del token en la lista de tokens `_allTokens`

&nbsp;

**Reescritura de métodos de la superclase**

Podemos invocar un método de la superclase con `super._methodName(...)` para ejecutar un método del contrato padre.

&nbsp;

**Metadatos del token ERC-721**

`IERC721Metadata is IERC721` y cuenta con las siguientes funciones getters:
* `name` - Devuelve el nombre del token
* `symbol` - Devuelve el simbolo del token
* `tokenURI` - Devuelve la URI del token pasado cómo parámetro

En el contrato ERC721Metadata definiremos:
* Variables
  * _name
  * _symbol
* Mappings
  * _tokenURIs: relaciona tokenId con su URI

Además definiremos las siguientes funciones internas:
    * `_setTokenURI` - Establece la URI de un token
    * `_burn` - Quema un token

&nbsp;

**Creación de token completo**

Visto lo anterior, un token ERC-721 completo quedaría tal que así:

```solidity
    contract ERC721Full is ERC721, ERC721Enumerable, ERC721Metadata {
        constructor (string memory name, string memory symbol) public ERC721Metadata(name, symbol) {
            
        }
    }
```

---
&nbsp;

### 4.3. Qué son las DApps

&nbsp;

Son aplicaciones cuyo funcionamiento se basa en una red decentralizada de nodos, en oposición a aquellas que se basan en servidores centralizados.

| DApps | Apps Centralizadas |
| --- | --- |
| Se ejecuta en varios nodos sin un control central | Se ejecuta en un servidor controlado por una empresa |
| Garantiza la transparencia e inmutabilidad de datos | No tienen por que ser transparentes y los datos están a merced de una empresa |
| Aseguran la identidad de los usuarios | La identidad de los usuarios puede ser engañosa |

&nbsp;

Cada usuario es un nodo de la red, cada usuario vela por el correcto funcionamiento y las oepraciones que se realizan en dicha red.
El canal de comunicaciones utilizado es, en este caso, blockchain. En ella quedan registradas las operaciones que pasan por el SmartContract que controla la DApp, garantizando su inmutabilidad.

Esta estructura, garantiza además, que la DApp tenga una disponibilidad muy alta (es dificil que todos los nodos caigan a la vez), así cómo resistencia a la censura.

&nbsp;

**Características de las DApps**

* **Seguridad**: Al funcionar sobre blockchain, se utilizan métodos criptográficos para asegurar la información. Solo la persona que ha creado los datos, puede acceder a ellos, el resto de usuario sólo podrán verificarlos. Esto minimiza el riesgo de filtración de datos o venta de los mismos a terceros.
* **Descentralización**: Funciona sobre un conjunto de nodos, cada uno de los cuales realiza el rol de servidor.
* **Código abierto**: Las DApps deben garantizar un alto nivel de transparencia, es por ello que las aplicaciones de código abierto son preferidas.
* **Herencia blockchain**: Cada interacción con la DApp genera datos en la blockchain, que se almacenan criptográficamente y de forma inmutable.
  
&nbsp;

**Clasificación de las DApps**

* **Tipo I**: DApps que poseen su propia infraestructura, no dependen de una blockchain externa para su ejecución.
* **Tipo II**: Dependen de una blockchain y sus características para poder funcionar, bien utilizando tokens propios o los de blockchain sobre la cual se ejecutan.
* **Tipo III**: Utilizan aplicaciones distribuídas de tipo II para su funcionamiento. Habitualmente, utilizan los tokens de DApps tipo II para su funcionamiento.
 
&nbsp;

**Limitaciones de las DApps**

* Dificultad para explotar el potencial de hardware de los dispositivos de los usuarios. Especialmente en aplicaciones web.
* Complejidad de depuración y aditoría de seguridad.
* El crecimiento y mejora de las Dapps está ligado al desarrollo, mejoras y herramientas disponibles para la blockchain.
* Dificultad de implementación de funcionalidades necesarias para la DApp.

---
 
&nbsp;

### 4.3. DApp con tokens nft

&nbsp;

**Inicialización de la App**

1. Inicializamos la aplicación React:
    
    `npx create-react-app dapp-nft`

2. Instalamos las dependencias:
    
    ```bash
    cd dapp-nft
    npm install bootstrap react-bootstrap truffle web3
    ``` 

3. Editamos la cofiguración de truffle `truffle-config.js`:
   