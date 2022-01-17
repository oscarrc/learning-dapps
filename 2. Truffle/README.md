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

**Comandos básicos de Truffle**

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