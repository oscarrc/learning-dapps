// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0 <0.9.0;

contract Ganache {
    string message = "";
    uint [] list;

    function setMessage(string memory _message) public {
        message = _message;
    }

    function getMessage() public view returns (string memory){
        return message;
    }

    // Esta función consume mucho gas
    function populateList() public {
        for(uint i = 0; i < 100; i++){
            list.push(i);
        }
    }

    function viewList() public view returns(uint [] memory){
        return list;
    }
}

