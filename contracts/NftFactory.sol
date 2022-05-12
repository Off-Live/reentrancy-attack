pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";


contract NftFactory is ERC721Enumerable {

    uint256 MAX_SUPPLY = 1000;
    uint256 MAX_MINT_PER_TX = 50;
    uint256 price = 0.001 ether;

    constructor() ERC721(TOKEN_NAME, TOKEN_SYMBOL) {
    }

    function mintNFT(uint256 numberOfTokens) public payable {
        require(numberOfTokens <= maxPurchasePerMint, "Tried to mint too many ghosts");
        require(totalSupply() + numberOfTokens <= MAX_GHOSTS, "Purchase would exceed max supply of ghosts");
        require(ghostPrice * numberOfTokens <= msg.value, "inefficient ether");

        uint256 count = 0;
        for (uint256 i = 0; i < numberOfTokens; i++) {
            if (totalSupply() < MAX_SUPPLY) {
                _safeMint(msg.sender, totalSupply());
                count += 1;
            }
        }
    }
}
