// SPDX-License-Identifier: MIT

pragma solidity >= 0.8.0 <0.9.0;

contract Hello {
    string public message = "Hello world";

    function getMessage() public view returns(string memory){
        return message;
    }

    function setMessage(string memory _message) public{
        message = _message;
    }
}