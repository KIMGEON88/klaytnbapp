 pragma solidity ^0.5.0;

 contract Coin{
     // the keyword "public" makes those variables
     // easily readable from outside.

     address public minter;
     mapping(address => uint) public balances;

    // Events allow light clients to react to
    // chages efficiently
     event Sent(address from, address to, uint amount);

    // This is the constructor whose code is
    // run only then the contract is created.
    constructor() public{
        minter=msg.sender;
    }

    function mint(address receiver, uint amount) public{
        require(mag.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.")
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount)
    }

 }