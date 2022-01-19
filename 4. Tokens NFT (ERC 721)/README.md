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

Los tokens ERC-721 heredan de ERC-165. La interfaz IERC165 (*@openzeppelin/contracts/introspection/IERC165.sol*) define la función `supportsInterface` que devuelve un booleano en caso de que implemente correctamente la interfaz pasada cómo parámetro.

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

