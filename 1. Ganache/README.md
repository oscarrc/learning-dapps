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