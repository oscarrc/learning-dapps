#!/bin/bash

# Migramos los contratos
truffle migrate --network bscTestnet --reset

# Iniciamos el servidor
npm run start