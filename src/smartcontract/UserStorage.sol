pragma solidity >=0.4.23;

// import "filename";

contract UserStorage{
    mapping (address => uint) userData; // 상태변수

    function set(uint x)public{
        userData[msg.sender] = x;
    }
    function get()public view returns(uint){
        return userData[msg.sender];
    }
    function getUserData(address user)public view returns(uint){
        return userData[user];
    }   
    // View일 경우 상태 변수는 수정 안 됨.
}