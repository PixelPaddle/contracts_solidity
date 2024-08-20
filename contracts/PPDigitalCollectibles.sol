// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./core/ERC721A.sol";

contract PPDigitalCollectibles is ERC721A, AccessControl {
    string private _baseTokenURI = "https://api.pixelpaddle.com/token/card/";

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    /**
    @dev modifier to check if msg.sender is minter or admin
    */
    modifier onlyModerator() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, _msgSender()) ||
                hasRole(MINTER_ROLE, _msgSender()),
            "not minter or admin role"
        );
        _;
    }
    /**
    @dev modifier to check if msg.sender is admin
    */
    modifier onlyAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "not admin role");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721A(_name, _symbol) {
        _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    /**
    @dev mint token to user
    @param _user address to which token will be minted
    @param _quantity tokens amount minted to user
    */
    function mint(address _user, uint256 _quantity) external onlyModerator {
        require(_user != address(0), "zero address not allowed");
        _safeMint(_user, _quantity);
    }

    /**
    @dev set base uri for nfts, used for metadata, images, etc
    @param baseURI base uri for nfts
    */
    function setBaseURI(string memory baseURI) public onlyAdmin {
        _baseTokenURI = baseURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view virtual override(ERC721A, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
