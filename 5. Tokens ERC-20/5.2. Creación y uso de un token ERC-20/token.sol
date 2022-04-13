//SPDX-License-Identifier: MIT

pragma solidity >=0.4.4 <0.9.0;
pragma experimental ABIEncoderV2;

import "../../0. Utils/SafeMath.sol";
import "./interface.sol";

/// @title Token
/// @author Oscar R.C.
/// @notice Define un token ERC-20

contract Token is IERC20{
    // Declaramos la librería SafeMath para su uso con uints
    using SafeMath for uint;

    // CONSTANTES
    // Nombre del token
    string public constant name = "Oscar R.C. Token";

    //Symbolo del token
    string public constant symbol = "ORCT";

    // Indicamos el número de decimales del token
    uint8 public constant decimals = 2;

    // MAPPINGS
    // Balance de tokens de cada cuenta
    mapping (address => uint256) public balances;

    // Mapeo de allowances. Ceder tokens a otras direcciones
    mapping (address => mapping(address => uint)) allowed;

    // VARIABLES
    // Total supply no es pública, solo se puede consultar desde el método totalSupply
    uint256 totalSupply_;

    // ADICIONAL: declaramos el owner del contrato
    address public owner;

    // CONSTRUCTOR
    constructor(uint256 _initialSupply){
        //Inicializamos el owner del contrato;
        owner = msg.sender;

        //Inicializamos el totalSupply nadie podrá modificarlo
        totalSupply_ = _initialSupply;

        //El owner del contrato es el propietario de todos los tokens en un principio
        balances[owner] = totalSupply_;
        
    }

    // METODOS HEREDADOS
    function totalSupply() public override view returns (uint256){
        return totalSupply_;
    }

    function balanceOf(address _wallet) public override view returns (uint256){
        return balances[_wallet];
    }

    function allowance(address _owner, address _delegate) public override view returns (uint256){
        return allowed[_owner][_delegate];
    }

    function transfer(address _recipient, uint256 _amount) public override returns (bool){
        // Requerimos que el emisor de la transferencia tenga tokens suficientes para transferir
        require(balances[msg.sender] >= _amount, "Not enough tokens");

        // Realizamos la transferencia. Primero retiramos y luego añadimos para asegurar consistencia
        // Quitamos los tokens de la cuenta del emisor
        balances[msg.sender] = balances[msg.sender].sub(_amount);
        // Y los añadimos al receptor
        balances[_recipient] = balances[_recipient].add(_amount);

        // Emitimos el evento de transferencia
        emit Transfer(msg.sender, _recipient, _amount);

        //Devolvemos true, la transferencia se ha completado correctamente
        return true;
    }

    function approve(address _delegate, uint256 _amount) public override returns (bool){
        // Aceptamos que cierta persona haga uso de tokens en nombre de otro
        allowed[msg.sender][_delegate] = _amount;

        // Emitimos el evento de aprovación
        emit Approval(msg.sender, _delegate, _amount);

        // Opereación completada con éxito
        return true;
    }

    function transferFrom(address _owner, address _buyer, uint256 _amount) public override returns (bool){
        // El propietario tiene que disponer de los tokens
        require(balances[_owner] >= _amount, "Allower has not enough tokens");

        // Debemmos tener allowance para transferir dichos tokens
        require(allowed[_owner][msg.sender] >= _amount, "Allowance is not enough");

        // Realizamos la transferencia
        // Quitamos los tokens del owner
        balances[_owner] = balances[_owner].sub(_amount);
        // Quitamos los tokens del allowance
        allowed[_owner][msg.sender] = allowed[_owner][msg.sender].sub(_amount);
        // Transferimos los tokens al receptor
        balances[_buyer] = balances[_buyer].add(_amount);

        // Emitimos el evento de la transferencia
        emit Transfer(_owner, _buyer, _amount);

        //Transferencia exitosa
        return true;
    }


    // METODOS ADICIONALES
    // Método para incrementar el total supply
    function increaseTotalSupply(uint _amount) public{
        //Solo el owner puede generar tokens
        require(msg.sender == owner, "Only contract owner can increase the supply");
        
        // Incrementamos el total supply utilizando safeMAth
        totalSupply_ = totalSupply_.add(_amount);

        // Atribuímos los tokens al propietario
        balances[owner] = balances[owner].add(_amount);
    }
}