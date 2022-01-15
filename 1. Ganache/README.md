# CURSO DAPPS Y NFT EN ETHEREUM
## 1. Ganache

&nbsp;

### 1.1 Primeros Pasos en Ganache

&nbsp;

**Qué es Ganache**

Ganache es una cadena de bloques Ethereum personal, ejecutada en en local, que permite probar la funcionalidad de dapps y NFT e inspeccionar el estado en un entorno seguro y determinista.

* [Ganache GUI](https://trufflesuite.com/ganache/)
* [Gahache CLI](https://docs.nethereum.com/en/latest/ethereum-and-clients/ganache-cli/)

&nbsp;

**Instalación Node.js**

Necesitamos instalar Node.js para ejecutar Ganache CLI. Es una de las dependencias de desarrollo necesarioas para éste curso.

[Node.js](https://nodejs.org/)

&nbsp;

**Instalación de Ganache**

Para este curso necesitaremos:
1. Descargar e instalar Ganache GUI descargando el instlador
2. Instalar Ganache CLI con `npm install -g ganache-cli`

```bash
$> ganache-cli -p 7545

Ganache CLI v6.12.2 (ganache-core: 2.13.2)

Available Accounts
==================
(0) 0x568CAB581A3828D39082011dd99D5aB66539F09B (100 ETH)
(1) 0x64978c46E954411d636CF9f6bb3E6401Bd6E0245 (100 ETH)
(2) 0x7a5BA9B5876FeF904c0D70F01F6E71878ad6386E (100 ETH)
(3) 0x1e615A9e8ec906e2Aea519be06e172C6e053a28d (100 ETH)
(4) 0x24aCEF002D3E5e6d6aEb6Fc289755CF730383ed0 (100 ETH)
(5) 0x37f750872237Bb33731Ba9C5792532C29baBe049 (100 ETH)
(6) 0xafCe375Cdc47296FB3a725c8e8fb9048CB093e91 (100 ETH)
(7) 0xebc7a5D1ea22ae621A67926b5bb88f2Ea0FCd401 (100 ETH)
(8) 0xa43f1Bb007D865A75de6205Bda84EDB5858CEC5B (100 ETH)
(9) 0x797b1bA20929B692107E09c4C174a9928Ec5c32d (100 ETH)

Private Keys
==================
(0) 0xf257e88288160238ea60ee60f677479c9bc2aea879850d8f4e1bf93779cec605
(1) 0x544aa964c8a61a7d8510cc092c8ea64e6b6a036dfb453eadb920da1e3a66baea
(2) 0x8383d54e68e66d4ab4a27924c275d33e8f8aa5a465a44e997792d3f3c51a66b9
(3) 0x9f2f7cedfe4c845e76392f006699c1d84bdcd493966a32939f409ffaee2ac6e7
(4) 0x4b089d1a8d6ab07df8ab9d5937978735b21bd91db63902970b1cfaacd48fb996
(5) 0xa23b12c41a0d587818e1a2b75aa85f691345d8c6fd79adb464178137debf41da
(6) 0xb27ed7fc6a6a128d815f21fbecf6d9cc57e4ddfe6e97e53c0647adda7ff6b148
(7) 0x15628dde2cda731dd77c734022a0e3519ce3c062a714b1bf53f5abd915eceb5b
(8) 0x2db42aa3c5be7cf8d09e0ec27f6094b56d9c07c83881a796332216eb5cb9019e
(9) 0x9a79748463802a14669924994203c992be99453dd8c389647a143ecdfb179489

HD Wallet
==================
Mnemonic:      neck visual field siren arrange bean same dad good quality fine paper
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Call Gas Limit
==================
9007199254740991

Listening on 127.0.0.1:7545
```

> NOTA: El puerto por defecto de Ganache es 7545

&nbsp;

**Creación de workspace en Ganache**

Ganache -> New Workspace (Ethereum)

* Workspace:
  * Workspace name: nombre del workspace
  * Truffle projects : projectos de Truffle configurados
* Server: configuraciones del servidor (puerto, network id, hostaname, etc...)
* Accounts and keys: configuracion de cuentas a generar
* Chain: Configuración de la cadena. Límites de gas y hardfork a utilizar
* Advanced: Otras opciones avanzadas

&nbsp;

**Conectar Smart Contract con Ganache**

En Remix:
1. Creamos un Smart Contract de ejemplo (*ganache.sol*)
2. Cómo *Enviroment* seleccionamos *Web3 provider*
3. En **Web3 provider endpoint**, colocamos la dirección del *RPC Server* de Ganache
4. Con esto podemos ya desplegar nuestro Smart Contract localmente en Ganache (`Custom (5777) network`).

En Ganache:
* En el *Blocks* veremos los bloques minados y la siguiente información
  * Número de bloque
  * Fecha de minado
  * Gas utilizado
  
* En *Transaction* veremos las transacciones realizadas pueden ser de tipo:
  * **Contract Creation**: creación (despliegue) de contrato
  * **Contract Call**: llamada a contrato
  
  De cada una de estas transacciones tendremos disponible la siguiente información:

    * TX Haxh: hash de la transracción
    * From address: dirección que realiza la transacción
    * To address: dirección a que se dirige la transacción
    * Gas used: gas utilzado
    * Value: valor de la transacción en Ethers

  Cada vez que se realice una transacción se generará un nuevo bloque.

**Error de conexión de Ganache en Windows**

&nbsp;

Seguramente si usas Windows como Sistema Operativo es posible que tengas algún error para conectar Ganache con Remix usando Google Chrome, no obstante, hay varias soluciones para afrontar el problema.

Es posible que tengas el error: *"Not possible to connect to the Web3 provider. Make sure the provider is running, a connection is open (via IPC or RPC) or that the provider plugin is properly configured."*

Las soluciones pueden ser las siguientes:
* Puedes resolverlo usando Firefox, otro navegador que permite hacer esta conexión sin problemas.
* Para seguir usando Chrome existe la posibilidad de enlazar la cuenta de Ganache con Metamask y hacer una conexión de Remix con Metamask y la conexión será exitosa. (Lo veremos a continuación).

&nbsp;

**Importar una Wallet de Ganache a Metamask**

En primer lugar deberemos añadir la blockchain de Ganache a Metamask. 

En Metamask, vamos a Redes -> RPC Personalizada
* Nombre de la nueva cadena: Ganache
* Nueva dirección URL RPC: http://127.0.0.1:7545
* Identificador de cadena: 5777
* Nombre de la divisa: Ether
* Símbolo de la divisa: ETH

&nbsp;

> NOTA: Si estamos utilizando el puerto por defecto de Ganache, no es necesario añadir la blockchain, bastará con seleccionar **localhost**

&nbsp;

Una vez hecho esto, seleccionamos la red *Ganache* que acabamos de crear y vamos a importar nuestra cuenta:
1. En Ganache, mostramos la clave privada y la copiamos.
2. En Metamask, vamos a Cuentas -> Importar cuenta
   * Importar mediante clave privada
   * Pegar clave privada

Con esto tendríamos nuestra cuenta importada, y podemos ver el balance que tenemos, que coincidirá con el de Ganache.

&nbsp;

**Introducción a Ganache CLI**

Ganache CLI es la última versión de TestRPC: un emulador de blockchain rápido y personalizable. Te permite hacer llamadas a la blockchain sin los gastos generales de ejecutar un nodo real de Ethereum.

* Las transacciones se "minan" al instante.
* No hay costes de transacción.
* Las cuentas pueden ser recicladas, reiniciadas e instanciadas con una cantidad fija de Ether (sin necesidad de faucets o minería).
* El precio del gas y la velocidad de minado se pueden modificar.
* Una cómoda interfaz gráfica de usuario le ofrece una visión general de los eventos de su cadena de pruebas.

Iniciaremos Ganache CLI con el comando `ganache-cli <opciones>`, siendo las opciones básicas:

* `-a` o `--accounts`: Especifica el número de cuentas a generar al inicio.
* `-b` o `--blocktime`: Especifica el tiempo de bloqueo en segundos para la minería automática. Por defecto es 0 y no hay minería automática.
* `-d` o `--deterministic`: Genera direcciones deterministas basadas en un mnemónico predefinido.
* `-n` o `--secure`: Bloquear las cuentas disponibles por defecto (bueno para la firma de transacciones de terceros).
* `-m` o `--mnemónico`: Utiliza un mnemónico específico de la cartera HD para generar las direcciones iniciales.
* `-p` o `--port`: Número de puerto para escuchar. El valor predeterminado es 8545.
* `-h` o `--hostname`: Nombre de host para escuchar. Por defecto es el servidor de Node.listen().
* `-s` o `--seed`: Utiliza datos arbitrarios para generar el mnemónico de la cartera HD a utilizar.
* `-g` o `--gasPrice`: Utiliza un precio de gas personalizado (por defecto es 20000000000)
* `-l` o `--gasLimit`: Utiliza un límite de gas personalizado (por defecto 90000)
* `-f` o `--fork`: Fork desde otro cliente Ethereum actualmente en ejecución en un bloque determinado. La entrada debe ser la ubicación y el puerto HTTP del otro cliente, por ejemplo, http://localhost:8545. Puede especificar opcionalmente el bloque desde el que se va a bifurcar utilizando un signo @: http://localhost:8545@1599200.
* `-i` o `--networkId`: Especifica el identificador de red que usará ganache-cli para identificarse (por defecto es la hora actual o el identificador de red del blockchain bifurcado si está configurado)
* `--db`: Especifica una ruta a un directorio para guardar la base de datos de la cadena. Si ya existe una base de datos, ganache-cli inicializará esa cadena en lugar de crear una nueva.
* `--debug`: Muestra los códigos de operación de la máquina virtual para su depuración.
* `--mem`: Muestra las estadísticas de uso de memoria de ganache-cli. Esto reemplaza la salida normal.

Podemos consultar el resto de opciones en el [Repo Github de Ganache-CLI](https://github.com/trufflesuite/ganache-cli-archive/blob/develop/README.md)

---

&nbsp;

### 1.2. Primer proyecto con Solidity y Ganache

Desarrollo de un sistema de evaluaciones dónde un profesor puede evaluar a sus alumnos publicando las notas de la blockchain.

Consideraciones:
* Los datos privados han de permanecer privados
* Los profesores interactuarán con el SmartContract para publicar las notas
* Los alumnos podrán interactuar con el smart contract para solicitar revisiones de examen.
 
*Ejemplo de notas*
| Alumno | Id | Nota |
| -- | -- | -- |
| Marcos | 77755N | 5 |
| Joan | 12345K | 9 |
| Maria | 02468T | 7 |
| Marta | 13579U | 3 |
| Alba | 98765Z | 6 |

&nbsp;

**Despliegue en Ganache**

1. Creación de un workspace de Ethereum.
2. En remix, seleccionamos environment Web3 Provider
  * En Web3 provider endpoint ponemos la RPC URL de Ganache: `http://127.0.0.1:7545` o la que corresponda en cada caso.
3. Desplegamos el contrato en Ganache
