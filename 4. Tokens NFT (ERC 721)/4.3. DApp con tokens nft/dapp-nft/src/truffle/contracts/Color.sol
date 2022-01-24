// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "../../../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721Enumerable {
    string [] public colors;
    mapping (string => bool) _colorExists;

    constructor () ERC721("Color", "COLOR") { }

    // Mintea un color
    function mint(string memory _color) public {
        // Requerimos que el token no exista
        require(_colorExists[_color] == false, "Color already exists");

        // Lo añadimos a nuestro array de colores
        colors.push(_color);

        // El id será la longitud del array
        uint _tokenId = colors.length;
        
        // Minteamos el token con la función mint del contrato ERC721 _mint(address to, unint256 tokenId)
        _mint(msg.sender, _tokenId);
        // Lo añadimos al mapping de existencia
        _colorExists[_color] = true;
    }
}