# CURSO DAPPS Y NFT EN ETHEREUM
## 2. Truffle

&nbsp;

### 2.1 Primeros Pasos en Truffle

&nbsp;

Truffle es un framework de desarrollo para Ethereum. Truffle provee:
* Compilación, enlazado, despliegue y administración binaria de SmartContracts
* Testeo automático de Smart Contracts
* Entorno de implementación y migración extensible y programable.
* Trabajar con diferentes redes públicas, federadas o privadas.
* Gestión de paquetes ETHpm y npm.
* Aporta una consola interactiva para interactuar directamente con Smart Contracts.
* Ejecutar scripts que interactuan con los Smart Contracts.

[Documentación de Truffle](https://trufflesuite.com/docs/truffle/)

Para instalar Truffle ejecutaremos `npm install truffle -g`

Necesitaremos además un cliente de Ethereum.

&nbsp;

**Creación de SmartContract para Truffle**

Crearemos un contrato simple (*hello.sol*) que simplemente enviará y recibirá información de la blockchain. En las siguientes secciones utilizaremos Truffle para desplegar e interactuar con este Smart Contract.

&nbsp;

**Creación de un espacio de trabajo**


Creamos una carpeta con el nombre deseado, en este caso *"2.1. Primeros pasos en Truffle"*. 

En un terminal, nos situamos en esa carpeta y para inicializar el proyecto de Truffle ejecutamos:

`truffle init`

Esto nos creará el archivo `truffle-config.js`, que sirve par configurar el coportamiento de Truffle y las carpetas:

* **contracts**: carpeta que almacenará los contratos. 
    * Contiene el contrato *Migrations.sol*, controla el despliegue de los contratos.
    * Aquí moveremos el contrato *hello.sol* creado en la sección anterior.

* **migrations**: contiene ficheros .js que permiten hacer despliegue de los contratos.
    * Contiene `1_initial_migration.js` para desplegar el contrato Migrations.sol
    * Crearemos `2_initial_truffle.js` para desplegar nuestro contrato tomando como referencia el anterior

        ```javascript
        const Hello = artifacts.require("Hello");

        module.exports = function (deployer) {
            deployer.deploy(Hello);
        };
        ```
    
* **test**: almacena los ficheros de test.

&nbsp;

**Enlazar Truffle con Ganache**

En el archivo de configuración `truffle-config.js` localizaremos la sección **networks**, descomentaremos el objeto **development** y ajustaremos sus valores a los valores en Ganache:

```javascript
networks: {
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Ganache Port
        network_id: "*",       // Any network (default: none)
    },
```

En este archivo de configuración también deberemos tener en cuenta la versión del compilador compatible con nuestro contrato:

```javascript
    compilers: {
        solc: {
        version: "0.8.11",
        }
    },
```


&nbsp;

* `init`: Inicializa un proyecto de Truffle ene el directorio seleccionadao.
* `compile`: Compila los contratos de Truffle. Genera la carpeta `build/contracts`
* `migrate`: Realiza las migraciones de los contratos (los despliega) existentes en la carpeta `migrations`.

    Si no hemos compilado los contratos previamente, se compilaran al ejecutar éste comando.

    ```
    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.



    Starting migrations...
    ======================
    > Network name:    'development'
    > Network id:      5777
    > Block gas limit: 6721975 (0x6691b7)


    1_initial_migration.js
    ======================

    Deploying 'Migrations'
    ----------------------
    > transaction hash:    0x4d4fe64826a7e442ce071e11f80bac27951962c8aa00dace7e1db2c3509aa2e7
    > Blocks: 0            Seconds: 0
    > contract address:    0x9A1451eC69FDDAb473c99506Aa7b2000F52471E8
    > block number:        5
    > block timestamp:     1642250826
    > account:             0xeC050971e5494a153EA1D48Adb9Af455255035a0
    > balance:             99.97930216
    > gas used:            248842 (0x3cc0a)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.00497684 ETH


    > Saving migration to chain.
    > Saving artifacts
    -------------------------------------
    > Total cost:          0.00497684 ETH


    2_initial_hello.js
    ==================

    Deploying 'Hello'
    -----------------
    > transaction hash:    0xf697236f74f6480e1923af3e8886f87c06fe227b453dfd7076ef6b3678309484
    > Blocks: 0            Seconds: 0
    > contract address:    0x3F2b762A880790844b3e1066e65DD659D100Fb42
    > block number:        7
    > block timestamp:     1642250828
    > account:             0xeC050971e5494a153EA1D48Adb9Af455255035a0
    > balance:             99.97094682
    > gas used:            375254 (0x5b9d6)
    > gas price:           20 gwei
    > value sent:          0 ETH
    > total cost:          0.00750508 ETH


    > Saving migration to chain.
    > Saving artifacts
    -------------------------------------
    > Total cost:          0.00750508 ETH
    ```
* `deploy`: Es un alias de `migrate`
* `console`: Consola interactiva para intractuar con los Smart Contracts
* `help`: Muestra la ayuda de Truffle

> NOTA: el modificador `--network <network-name>` nos permite escoger una red, definida en la configuración, sobre la cual realizar las operaciones

&nbsp;

**Creación de tests para un Smart Contract**

&nbsp;

* Crear los ficheros de tests en la carpeta `test` del espacio de trabajo Truffle. En este caso `test.js`
* Requerimos el contrato a testear con 
  
    ```javascript
        const Hello = artifacts.require("Hello");
    ```
* Utilizamos la función contract, la cual tiene una función callback que recibe cuentas cómo parámetro. Dentro del callback de esta función codificaremos los tests
  
    ```javascript
        contract("Hello", (accounts) => {
            // código tests
        })
    ```
* Definimos los tests con el método `it`. Recibe la descripción del test y una función callback asíncrona en que se realizan las aserciones:

    ```javascript
        it("Obtiene el mensaje", async () => {
            // Despliegue del contrato
            const hello = await Hello.deployed();

            // Obtenemos el mensaje llamando a la función getMessage desde la cuenta 0
            const message = await hello.getMessage.call({from: accounts[0]}); 

            // Comprobamos que el mensaje sea el esperado
            assert.equal(message, "Hello world");
        });
    ```

* Ejecutamos los tests y comprobamos que han pasado:

    ```bash
        $> truffle test

        Compiling your contracts...
        ===========================
        ✔ Fetching solc version list from solc-bin. Attempt #1
        ✔ Downloading compiler. Attempt #1.
        > Compiling ./contracts/Migrations.sol
        > Compiling ./contracts/hello.sol
        > Artifacts written to /tmp/test--414-ZaahUwdxHVdE
        > Compiled successfully using:
        - solc: 0.8.11+commit.d7f03943.Emscripten.clang

        Contract: Hello
            ✓ Obtiene el mensaje (1296ms)
            ✓ Cambia el mensaje (11757ms)

        2 passing (14s)
    ```

&nbsp;

> NOTA: Es necesario pasar una dirección a las llamadas de funciones del contrato si queremos realizarla desde una dirección distinta a la dirección 0 (por defecto).

> NOTA: Utilizamos `.call({from: <account>})` para realizar llamadas a funciones `view` del contrato.

&nbsp;

**Web3.js**

&nbsp;

Web3.js es una librería Javascript para comunicarnos con Smart Contracts en la red Ethereum. 
Provee una interfaz sencilla para interactuar con dichos contratos, en lugar de tener que escribir JsonRPC.

[Documentación Web3.js](https://web3js.readthedocs.io/)

Instalaremos Web3.js con el siguiente comando:
`npm install web3`

Algunas de las funciones que provee web3 son:
* `web3.eth.getAccounts()` - Devuelve un array de strings con las direcciones de las cuentas
* `web3.eth.getGasPrice([callback])` - Devuelve un entero con el precio del gas en Weis
* `web3.eth.getBalance([account])` - Develve un entero con el balance de la cuenta en Weis
* `web3.eth.getBlock([block])` - Devuelve información del bloque indicado mediante su índice o su hash

&nbsp;

**Truffle console**

&nbsp;

Truffle console permite interactuar con Smart Contracts de manera interactiva en la terminal, utilizando Javascript y los comandos de Truffle. Para ello, previamente debemos haber compilado y migrado el contrato con que queremos interactuar.

* Instanciación del contrato
    ```bash
        $> truffle console
        truffle(development)> migrate
        truffle(development)> let instance = Hello.deployed();
    ```

> NOTA: Puede aparecer el error *Uncaught ReferenceError: global is not defined* lo solucionamos estableciendo `global = this`.

* Obtención de cuentas

    ```bash
        truffle(development)> let accounts = await web3.eth.getAccounts();
        truffle(development)> accounts
            [
                '0x2f24D49D28436B8499D5F37f7dE3130F8241C0B0',
                '0x2c12271169341f075c4883550D5e584cCcC6D935',
                '0x4E30FDeb52dB905eAeBF2209B6ed91F2D16229d6',
                '0xE78dc63757d548C323F0ce419B3e6f5f16679d76',
                '0xeE4F3DEC8E4C1ADF58a0b1F0D399ad15faE15ED5',
                '0xB2BB4d2383F30f5a62916f6D7E50E79F05C958dD',
                '0x2D1EEF06AE391BC7aa877Cc963a83B66a171B0cd',
                '0xc4aeA460325ad6258666079DB0211fA311353f35',
                '0xAef7341D34835705904E0bfE267835862f65746F',
                '0x228b1CfCAD54Ff2639AcAA8198Fc8Ea121fD3747'
            ]
    ```
* Ejecución de funciones

    ```bash
      truffle(development)> let message = await instance.getMessage();
      truffle(development)> message
        'Hello world'
      truffle(development)> let tx = await instance.setMessage("HI WORLD", { from: accounts[1] });
      truffle(development)> message = await instance.getMessage();
      truffle(development)> message
        'HI WORLD'
    ```  
---

&nbsp;

### 2.2 Truffle con detalle

&nbsp;

**Creación del directorio del proyecto**

Vamos a repasar como empezar un proyecto Truffle:

1. Inicialización del proyecto

    ```bash
        $> mkdir "2.2. Truffle con detalle"
        $> truffle init
    ```

2. Editar configuración de Truffle:
    * Establecer configuración de red
    * Comprobar / establecer versión del compilador
3. Colocar los contratos en la carpeta `contracts`. Vamos a utilizar el contrato `evaluaciones.sol` del punto 1.2. 
4. Escribir *migrations* para el nuevo contrato
5. Compilar contrato con `truffle compile`
    * Durante el desarrollo, debemos recompilar el contrato para reflejar los cambios en el mismo
6. Migrar (desplegar) contrato con `truffle migrate`

&nbsp;

**Creación de tests**

&nbsp;

Tal y cómo vimos en la sección anterior vamos a programar tests (fichero `test/evaluaciones.test.js`) para comprobar las siguientes funciones del Smart Contract:
* Solo el profesor puede evaluar
* Alumnos y profesor pueden ver las notas de un alumno
* Los alumnos pueden solicitar revisiones
* Solo el profesor puede ver las solicitudes de revisión

&nbsp;

```bash
    truffle(development)> test
    Using network 'development'.


    Compiling your contracts...
    ===========================
    > Everything is up to date, there is nothing to compile.



    Contract: Evaluaciones
        ✓ Solo el profesor puede evaluar (13033ms)
        ✓ Alumnos y profesor pueden ver las notas de un alumno (3636ms)
        ✓ Los alumnos pueden solicitar revisiones (3672ms)
        ✓ Solo el profesor puede ver solicitudes de revision (479ms)


    4 passing (23s)
```

&nbsp;

**Añadiendo nuevas funcionalidades y tests**

&nbsp;

Las notas irán enlazadas a una asignatura en concreto 
* Añadimos el nombre asignatura al hash del alumno
* Cambiamos el array de revisiones y la función solicitar revisión por un mapping que relacione la asignatura con un array de strings que serán los ids de los alumnos
* Cambiamos la función para ver revisiones añadiendo el nombre de asignatura cómo parámetro

Tras hacer esto será necesario adaptar los tests a esta nueva funcionalidad.