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

---

### 2.2 Creación de SmartContract para Truffle

&nbsp;

Crearemos un contrato simple (*hello.sol*) que simplemente enviará y recibirá información de la blockchain. En las siguientes secciones utilizaremos Truffle para desplegar e interactuar con este Smart Contract.

---

### 2.3 Creación de un espacio de trabajo

Creamos una carpeta con el nombre deseado, en este caso *"2.3. Espacio de trabajo"*. 

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

>NOTA: Podemos obtener ayuda de Truffle con `truffle help`

---

### 2.4 Enlazar Truffle con Ganache.

En el archivo de configuración `truffle-config.js` localizaremos la sección **networks**, descomentaremos el objeto **development** y ajustaremos sus valores a los valores en Ganache:

```javascript
networks: {
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 7545,            // Standard Ethereum port (default: none)
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


