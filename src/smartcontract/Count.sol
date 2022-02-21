pragma solidity >=0.4.24 <=0.5.6;

contract Count {
    uint256 public count =0;

    function getBlockNumber() public view returns (uint256) {
        return block.number;
    }

    function setCount(uint256 _count) public {
        count = _count;
    }
}

// 0x016c733A221cf7abEed8f44c2CbFb9754CA67680
// Count.sol 주소 (Baobob, Klaytn IDE)