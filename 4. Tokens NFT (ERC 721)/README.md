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