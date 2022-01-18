// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Oracle {
  address owner;

  // Número de asteroides que se prevee van a caer
  uint public numAsteroids;

  constructor(){
    // Establecemos el owner
    owner = msg.sender;
  }

  // Modificador que permita que solo el owner ejecute ciertas funciones
  modifier onlyOwner(){
    require(owner == msg.sender, "Only owner can do this");
    _;
  }

  // Evento que reciba datos del oráculo
  event __callbackNewData();

  //Función para actualizar datos recibidos del oráculo
  function update() public onlyOwner {
    emit __callbackNewData();
  }
  
  //Configuración manual numAsteroids
  function setNumAsteroids(uint _numAsteroids) public onlyOwner{
    numAsteroids = _numAsteroids;
  }
}
