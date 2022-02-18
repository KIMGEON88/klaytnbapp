pragma solidity >=0.4.23;

contract Practice{
    string public name = "klayLion";
    string public symbol = "KL";

    mapping (uint256 => address) public tokenOwner;
    mapping (uint256 => string) public tokenURIs;
    
    // 소유 토큰 리스트
    mapping (address => uint256[]) private _ownedTokens;

    // mint(tokenId, uri, owner)
    // transferFrom(from, to, tokenId) -> owner가 바뀌는 것 (from -> to)

    function mintWithTokenURI(address to, string memory tokenURI) public returns (bool){
        // to에게 tokenId를 발행하겠다.
        // 적힐 글자는 tokenURI
        tokenOwner[tokenId] = to;
        tokenURIs[tokenId] = tokenURI;
        // add token to the list
        _ownedTokens[to].push(tokenId);
        return true;
    }

    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        require(from == msg.sender, "from != msg.sender");
        require(from == tokenOwner[tokenId], "you are not the owner of the token");
        
        _removeTokenFromList(from, tokenId); // 원래 가지고 있던 위치에는 토큰을 삭제
        _ownedTokens[to].push(tokenId);// 보낼 사람에게 토큰 추가

        tokenOwner[tokenId] = to;
    }
    function _removeTokenFromList(address from, uint256 tokenId) private {
        // [10,15,19,20] -> 19번을 삭제하고 싶어요.
        uint256 lastTokenIndex = _ownedTokens[from].length-1;
        for(uint256 i=0; i<_ownedTokens[from].length;i++){
            if(tokenId == _ownedTokens[from][i]){
                // Swap last token with deleting token
                _ownedTokens[from][i] = _ownedTokens[from][lastTokenIndex];
                _ownedTokens[from][lastTokenIndex] = tokenId;
                break;
            }
        }
        _ownedTokens[from].length--;
    }
    function ownedTokens(address owner) public view returns (uint256[] memory){
    return _ownedTokens[owner];
    }

    function setTokenUri(uint256 id, string memory uri) public {
        tokenURIs[id] = uri;
    }
}
// 값을 읽어 들이는 것은 GAS가 안든다.

contract NFTMarket {
    
    mapping(uint256 => address) public seller;
    
    function buyNFT(uint256 tokenId, address NFTSimple, address to) pubilc returns (bool){
    // 구매한 사람한테 0.01 KLAY 전송
    address payable receiver = address(uint160(seller[tokenId]));

        NFTSimple(NFTAddress).safeTransferFrom(address(this), to, tokenId);
        return true;
    }
}// 서로 다른 스마트 컨트랙트를 호출 가능.