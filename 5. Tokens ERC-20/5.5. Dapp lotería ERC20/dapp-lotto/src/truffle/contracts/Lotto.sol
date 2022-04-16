//SPDX-License-Identifier: MIT

pragma solidity >=0.4.4 <0.9.0;

// Importamos el contrato del token
import "./ERC20.sol";
import "./SafeMath.sol";

/// @title Lotto
/// @author Oscar R.C.
/// @notice Sistema de loterías basado en blockchain y tokens ERC20

contract Lotto {
    // *** LIBRERIAS *** //
    // Declaramos SafeMath para uint
    using SafeMath for uint;

    // *** VARIABLES *** //
    // Instancia del contrato Token
    Token private token;

    // Owner del contrato
    address public owner;
    // Dirección del contrato
    address public contract_address; 

    // Número de tokens a crear
    uint public total_supply = 10000;

    // ** CONSTRUCTOR ** //
    constructor(){
        // Establecemos owner del contrato
        owner = msg.sender;

        // Establecemos la dirección del contrato
        contract_address = address(this);

        // Inicializamos el contrato Token ERC20
        token = new Token(total_supply);
    }

    // ------------------------- TOKEN ------------------------- //

    // ** MODIFICADORES ** //
    modifier onlyOwner(address _caller){
        require(_caller == owner, "This function is restricted to the contract owner");
        _;
    }

    // ** EVENTOS ** //
    event tokensBought(address buyer, uint amount);

    // *** FUNCIONES *** //
    // Funcion para establecer el precio del token
    function tokenPrice(uint _num_tokens) internal pure returns (uint) {
        return _num_tokens * 0.5 ether;
    }

    // Funcion para ampliar el numero de tokens
    function createTokens(uint _num_tokens) public onlyOwner(msg.sender){
        // Utilizamos el método increaseTotalSupply del contrato Token
        token.increaseTotalSupply(_num_tokens);
    }

    // Función para obtener el balance de tokens disponibles
    function availableTokens() public view returns(uint){
        // Los tokens disponibles son los tokens de los que dispone el address del contrato
        return token.balanceOf(address(this));
    }

    // Funcion para comprar tokens
    function buyTokens(uint _num_tokens) public payable{
        // Obtenemos el precio del token
        uint price = tokenPrice(_num_tokens);
        // Requerimos que el usuario tenga los eth suficientes
        require(msg.value >= price, "You don't have enough ether to buy this amount of tokens");

        // Obtención del número de tokens disponibles
        uint balance = availableTokens();
        // Requerimos que haya tokens disponibles suficientes
        require(balance >= _num_tokens, "There are not enough tokens available");

        // Calculamos las vueltas
        uint return_value = msg.value - price;
        // Se devuelve el returnValue al cliente
        address payable return_address = payable(msg.sender);
        return_address.transfer(return_value);

        // Transferimos los tokens al usuario
        token.transfer(msg.sender, _num_tokens);

        // Emitimos el evento
        emit tokensBought(msg.sender, _num_tokens);
    }

    // Funcion para obtener el balance de tokens en el bote
    function jackpot() public view returns(uint){
        // El bote se guarda en el owner del contrato
        return token.balanceOf(owner);
    }

    // Funcion para visualizar tokens disponibles
    function balanceOf() public view returns(uint){
        return token.balanceOf(msg.sender);
    }

    // ------------------------- LOTERIA ------------------------- //

    // ** VARIABLES ** //
    // Precio del boleto de lotería. 5 tokens.
    uint public ticketPrice = 5;

    // Relación entre usuario y números de los boletos comprados.
    mapping(address => uint[]) addressTickets;

    // Relación entre número y usuario
    mapping(uint => address) ticketAddress;

    // Número aleatorio para generar boletos
    uint randNonce = 0; // nonce es un valor que solo se utiliza una vez

    // Registro boletos generados
    uint []  tickets;

    // ** EVENTOS ** //
    // Boleto comprado
    event ticketBought(address buyer, uint ticket);

    // Boleto ganador
    event winningTicket(uint ticket);

    // ** FUNCIONES ** //
    // Comprar un boleto de lotería con tokens
    function buyTickets(uint _num_tickets) public{
        // Calculamos el precio
        uint price = _num_tickets * ticketPrice;
        // Requerimos que el usuario tenga los tokens suficientes
        require(balanceOf() >= price, "You don't have enough tokens to buy this amount of tickets");

        // Transferencia de tokens al owner del contrato (método transfer del contrato token). El bote.
        token.transferFromTo(msg.sender, owner, price);

        // Asignación del número de boleto aleatorio
        for(uint i = 0; i < _num_tickets; i++){
            /*
                Generamos un número aleatorio utilizando el hash de la marca de tiempo actual, la dirección del usuario y un nonce
                (Número que solo se utiliza una vez, para no ejecutar dos veces la misma función hash con los mismos parámetros).

                El nonce se incrementa en 1 en cada ejecución del bucle.

                Finalmente casteamos el hash a uint y lo dividimos entre 10000 para obtener los últimos 4 dígitos.
            */
            uint random = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))) % 10000;
            randNonce++;

            // Asignamos el número a los números del usuario
            addressTickets[msg.sender].push(random);
            // Asignamos el número a la dirección del usuario
            ticketAddress[random] = msg.sender;
            // Añadimos el boleto al array de boletos
            tickets.push(random);

            // Emitimos el evento de compra
            emit ticketBought(msg.sender, random);
        }
    }
  
    // Funcion que permite al usuario ver el número de sus boletos
    function viewTickets() public view returns(uint[] memory){
        return addressTickets[msg.sender];
    }

    // Funcion para generar ganador de la lotería e ingresar el premio
    function generateWinner() public onlyOwner(msg.sender){
        // Número de boletos comprados
        uint tikets_bought = tickets.length;

        // Requerimos que hay más de 1 boleto comprado
        require(tikets_bought > 1, "There are not enough tickets to generate a winner");

        // Generamos una posición aleatoria en el array tickets entre 0 y tickets_bought.
        // Casteamos dos veces para asegurarnos de que el resultado sea entero
        uint position = uint(uint(keccak256(abi.encodePacked(block.timestamp))) % tikets_bought);
        // Obtenemos el ganador
        uint winner = tickets[position];        
        // Emitimos el evento de ganador
        emit winningTicket(winner);

        // Transferimos los tokens al ganador
        token.transferFromTo(owner, ticketAddress[winner], jackpot());
    }

    function cashoutTokens(uint _num_tokens) public payable{        
        // Requerimos que el número de tokens a convertir sea mayor que cero
        require(_num_tokens > 0, "You can't cashout 0 or negative tokens");
        // Requerimos que el número de tokens a convertir sea menor o igual al número de tokens disponibles
        require(balanceOf() >= _num_tokens, "You don't have enough tokens to cashout");

        // Retiramos los tokens de la cuenta del usuario
        token.transferFromTo(msg.sender, contract_address, _num_tokens);
                
        // Calculamos el precio de los tokens
        uint total = tokenPrice(_num_tokens);
        // Transferimos el número de ethers al usuario. Los ethers se encuentran en la dirección del contrato
        address payable cashout_address = payable(msg.sender);
        cashout_address.transfer(total);
    }
}