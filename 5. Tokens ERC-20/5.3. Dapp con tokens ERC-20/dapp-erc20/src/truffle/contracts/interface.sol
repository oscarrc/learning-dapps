//SPDX-License-Identifier: MIT

pragma solidity >=0.4.4 <0.9.0;

/// @title IERC20
/// @author Oscar R.C.
/// @notice Interfaz ERC-20

interface IERC20 {
    // MÉTODOS DEL TOKEN
    // Devuelve la cantidad de tokens en existencia
    function totalSupply() external view returns (uint256);

    // Devuelve la cantidad de tokens de una cartera
    function balanceOf(address _wallet) external view returns (uint256);

    // Devuelve el número de tokens que el spender podra gastar en nombre del propietario (owner)
    function allowance(address _owner, address _spender) external view returns (uint256);

    // Devuelve un valor bool resultado de la operación de transferir tokens
    function transfer(address _recipient, uint256 _amount) external returns (bool);

    // Devuelve un valor bool resultado de la operación de gasto de tokens
    function approve(address _spender, uint256 _amount) external returns (bool);

    // Devuelve un valor bool reseultado de la operación de transpaso de tokens indirecto, desde un allowance
    function transferFrom(address _sender, address _recipient, uint256 _amount) external returns (bool);

    // EVENTOS (no es necesario definirlos en el contrato que implemente la interfaz)
    // Se emite cuando una cantidad de tokens pasa de un origen a un destino
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Se emite cuando se establece una asignación con el método allowance
    event Approval(address indexed owner, address indexed spender, uint256 value);
}