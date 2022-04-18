# CURSO DAPPS Y NFT EN ETHEREUM
## 6. Despliegue con Docker

&nbsp;

### 6.1. Introducción a Docker

&nbsp;

Docker es un proyecto de código abierto que automatiza el despliegue de aplicaciones dentro de **contenedores de software**, proporcionando una capa adicional de abstracción y automatización de virtualización de aplicaciones en múltiples sistemas operativos.1​Docker utiliza características de aislamiento de recursos del kernel Linux, tales como cgroups y espacios de nombres (namespaces) para permitir que "contenedores" independientes se ejecuten dentro de una sola instancia de Linux, evitando la sobrecarga de iniciar y mantener máquinas virtuales.

Docker resuelve el problema de portabilidad de código, proporcionando una manera estándar de ejecutar el código independientemente de la plataforma en la que se ejecuta. Usar Docker para crear y gestionar contenedores puede simplificar la creación de sistemas altamente distribuidos, permitiendo que múltiples aplicaciones, las tareas de los trabajadores y otros procesos funcionen de forma autónoma en una única máquina física o en varias máquinas virtuales.

[Instalación de Docker](https://docs.docker.com/install/)

&nbsp;

### 6.2. Despliegue de dApps con Docker

&nbsp;

**dApp Colores con Tokens NFT**

En esta sección estaremos containerizando la aplicación de tokens NFT con colores desarrollada en el apartado 4.3.

Para ello en el directorio raiz del proyecto crearemos los siguientes archivos:
* `Dockerfile` - Archivo que define la creación de imágenes Docker, la imagen base, directorio de trabajo, archivos a copiar, comandos a ejecutar, puertos, entrypoint, etc.
* `entrypoint.sh` - Script o comando que ejecutaremos al iniciar la imagen, en este caso, migraremos los contratos a BSC testnet e iniciaremos el servidor.
* `exec.sh` - script para automatizar la build y ejecución de la imagen.
* `.dockerignore` - similar a `.gitignore`nos permite ignorar archivos que no queremos incluir en la imagen, en este caso `node_modules`

&nbsp;

Desplegaremos la dApp en BSC testnet, para ello, antes de construir la imagen modificaremos el truffle-config.js para que incluya lo siguiente:

```javascript
const HDWalletProvider = require('@truffle/hdwallet-provider');

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {  
    (...)
    networks: {
        bscTestnet: {
            provider: () => {
                return new HDWalletProvider(mnemonic, "https://data-seed-prebsc-1-s1.binance.org:8545");
            },
            network_id: 97,
            confirmations: 10,
            timeout: 200,
            skipDryRun: true
        }
    }
    (...)
}
```

E instalar el `HDWalletProvider` en el proyecto:

```bash
    npm install --save-dev @truffle/hdwallet-provider
```
