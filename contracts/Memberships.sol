//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Memberships is ERC721 {
    // TODO: move svg to the constructor in v2
    // svg data
    string private constant svgPrefix = "data:image/svg+xml;base64,";
    string private constant svgNumberLine1 = "<svg viewBox='0 0 200 80' xmlns='http://www.w3.org/2000/svg'><text font='200px' class='small'>";
    string private constant svgNumberLine2 = "</text></svg>";

    // token id counter for the tiers
    uint256 private tier1TokenId = 1000000000;
    uint256 private tier2TokenId = 2000000000;
    uint256 private tier3TokenId = 3000000000;

    // price for the tiers
    uint256 public constant tier1Price = 0.0001 ether;
    uint256 public constant tier2Price = 0.0002 ether;
    uint256 public constant tier3Price = 0.0003 ether;

    // owner of the project
    address public immutable owner;

    // location of the venue
    string public location;

    // Mapping token id to tier level
    mapping(uint256 => uint8) private tiers;

    event PurchasedNFT(uint256 tokenId, uint8 tier, address to);

    /// @param owner_ creator of the project
    constructor(address owner_, string memory location_) ERC721("Membership", "MBS") {
        require(owner_ != address(0), "ERR_NON_ZERO");
        owner = owner_;
        location = location_;
    }

    /// @notice function to return first part of the URI
    function _baseURI() internal pure override returns(string memory) {
        return "data:application/json;base64,";
    }

    /// @notice return a number by tokenId
    function _getNumberByTokenId(uint256 tokenId) private view returns(uint8) {
        if (tokenId > tier2TokenId) {
            return 3;
        } else if (tokenId > tier1TokenId) {
            return 2;
        } else {
            return 1;
        }
    }

    function tokenURI(uint256 tokenId) public view override returns(string memory) {
        require(_exists(tokenId), "ERR_NON_EXISTING");

        // set NFT metadata JSON
        bytes memory metaDataTemplate = (
            abi.encodePacked('{"name":"',name(),'", "description":"An NFT that changes based on its tier","image":"',
            svgNumberLine1,
            _getNumberByTokenId(tokenId),
            svgNumberLine2,
            '"}'
        ));

        // base64 encode the bytes
        bytes memory metaDataTemplateInBytes = bytes(metaDataTemplate);
        string memory encodedMetada = Base64.encode(metaDataTemplateInBytes);
        
        // return both strings concatenated (baseURI + encodedMEtada) = fullJSON encoded 
        return (string(abi.encodePacked(_baseURI(), encodedMetada)));
    }

    function purchaseNFT(uint8 tier, address to) public payable returns(uint256 tokenId) {
        require(tier == 1 || tier == 2 || tier == 3, "ERR_TIER");
        require(balanceOf(to) == 0, "ERR_PURCHASED");
        if (tier == 1) {
            require(msg.value == tier1Price, "ERR_VALUE");
            tier1TokenId++;
            _safeMint(to, tier1TokenId);
            tokenId = tier1TokenId;
        } else if (tier == 2) {
            require(msg.value == tier2Price, "ERR_VALUE");
            tier2TokenId++;
            _safeMint(to, tier2TokenId);
            tokenId = tier2TokenId;
        } else if (tier == 3) {
            require(msg.value == tier3Price, "ERR_VALUE");
            tier3TokenId++;
            _safeMint(to, tier3TokenId);
            tokenId = tier3TokenId;
        }
        emit PurchasedNFT(tokenId, tier, to);
        return tokenId;
    }
}
