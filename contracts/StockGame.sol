// SPDX-License-Identifier: NONE
pragma solidity 0.8.7;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


/**
 *
 * @author Bhupesh Dubey
*/
contract StockGame is Ownable {

    using Counters for Counters.Counter;
    Counters.Counter private tokenIdCount;

    enum TeamName{ A, B }

    struct StockNft {
        uint256 id;
        string ticker;
        string name;
        TeamName team;
        address owner;
        int health;
    }

    event MintedStockNft(
        string indexed name,
        TeamName indexed team,
        int health,
        uint256 indexed tokenId
    );

    mapping(address => uint256) private balances;
    mapping(uint256 => address) private owners;
    mapping(uint256 => StockNft) private allTokens;
    mapping(string => bool) private tokenNameExists;

    string private winner;

    int public totalHealthOfTeamA;
    int public totalHealthOfTeamB; 

    /**
     *
     * @notice constructor sets the msg.sender to the owner of contract
    */
    constructor() { }

    /**
     *
     * @notice mints the new NFT for stocks and can be called only by owner of the contract 
     * @param _owner owner of the NFT
     * @param _ticker ticker name of the NFT
     * @param _team name of the team of NFT
     * @param _health health of the NFT
    */
    function mintStockNft(
        address _owner,
        string memory _ticker,
        TeamName _team,
        int _health
    ) public onlyOwner {

        require(_owner != address(0), "ERC721: mint to the zero address");

        tokenIdCount.increment();
        uint256 newTokenId = tokenIdCount.current();

        require(!_exists(newTokenId), "ERC721: token already minted");
        require(!tokenNameExists[_ticker], "Token with this name already exists!");

        _mint(_owner, newTokenId);
        tokenNameExists[_ticker] = true;

        bytes memory nameBytes;
        nameBytes = abi.encodePacked(_ticker);
        nameBytes = abi.encodePacked(nameBytes, "-Play");
        string memory nftName = string(nameBytes);

        StockNft memory newStockNft = StockNft(
            newTokenId,
            _ticker,
            nftName,
            _team,
            _owner,
            _health * 100
        );

        allTokens[newTokenId] = newStockNft;

        if(uint(allTokens[newTokenId].team) == 0){
            totalHealthOfTeamA += (_health * 100);
        }else{
            totalHealthOfTeamB += (_health * 100);
        }

        emit MintedStockNft(
            newStockNft.name,
            newStockNft.team,
            newStockNft.health,
            newStockNft.id
        );
    }

    /**
     *
     * @notice declares the winner of the game and can be called by the owner only
    */
    function declareWinner() public onlyOwner {
        winner = totalHealthOfTeamA > totalHealthOfTeamB ? "A" : 
            (totalHealthOfTeamB > totalHealthOfTeamA ? "B" : "Tie");
    }

    /**
     *
     * @notice updates the health of particular NFT & can be called by the owner only
     * @param _tokenId token ID of the NFT
     * @param _health health of the NFT
    */
    function updateHealth(
        uint256 _tokenId, 
        int _health
    ) public onlyOwner {
        require(_exists(_tokenId), "Invalid token ID");
        updateTotalHealthOfTeam(_tokenId, _health);
        StockNft memory nft = getTokenMetaData(_tokenId);
        nft.health = _health * 100;
        allTokens[_tokenId] = nft;
    }

    /**
     *
     * @notice resets the winner for new game and can be called by the owner only
    */
    function resetWinner() public onlyOwner {
        winner = "";
    }

    /**
     *
     * @notice updates the health of particular NFT & can be called by the owner only
     * @param _tokenId token ID of the NFT
     * @param _newHealth new health of the NFT
    */
    function updateTotalHealthOfTeam(
        uint256 _tokenId, 
        int _newHealth
    ) internal {
        if(uint(allTokens[_tokenId].team) == 0){
            totalHealthOfTeamA -= allTokens[_tokenId].health;
            totalHealthOfTeamA += (_newHealth * 100);
        }else{
            totalHealthOfTeamB -= allTokens[_tokenId].health;
            totalHealthOfTeamB += (_newHealth * 100);
        }
    }

    /**
     *
     * @notice updates the health of particular NFT & can be called by the owner only
     * @param _to address to which token is to be minted
     * @param _tokenId token ID of the NFT
    */
    function _mint(
        address _to, 
        uint256 _tokenId
    ) internal {
        require(_tokenId < 50001, "ERC721: maximum of 50000 tokens can be minted");
        balances[_to] += 1;
        owners[_tokenId] = _to;
    }

    /**
     *
     * @notice checks whether NFT with the ID exists or not
     * @return bool true or false based on successful ID fetching
     * @param _tokenId token ID of the NFT
    */
    function _exists(
        uint256 _tokenId
    ) internal view returns (
        bool
    ) {
        return owners[_tokenId] != address(0);
    }

    /**
     *
     * @notice returns the owner of particular token ID
     * @return address returns owner of the token
     * @param _tokenId token ID of the NFT
    */
    function ownerOf(
        uint256 _tokenId
    ) public view returns (
        address
    ) {
        address owner = owners[_tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    /**
     *
     * @notice returns the metadata of particular token
     * @return StockNft returns data of the token
     * @param _tokenId token ID of the NFT
    */
    function getTokenMetaData(
        uint256 _tokenId
    ) public view returns (
        StockNft memory
    ) {
        require(_exists(_tokenId), "Invalid Token ID!");
        return allTokens[_tokenId];
    }

    /**
     *
     * @notice returns total number of tokens minted till now
     * @return Counter returns count of tokens minted
    */
    function getNumberOfTokensMinted() public view returns (
        Counters.Counter memory
    ) {
        return tokenIdCount;
    }

    /**
     *
     * @notice returns the balance of the particular address
     * @return uint256 returns count of tokens owned by the address
     * @param _owner address of the user
    */
    function balanceOf(
        address _owner
    ) public view returns (
        uint256
    ) {
        require(_owner != address(0), "ERC721: balance query for the zero address");
        return balances[_owner];
    }

    /**
     *
     * @notice returns true/false based on the token exists or not
     * @return bool returns true or false
     * @param _tokenId token ID of the NFT
    */
    function getTokenExists(
        uint256 _tokenId
    ) public view returns (
        bool
    ) {
        require(_exists(_tokenId), "Invalid Token ID!");
        bool tokenExists = _exists(_tokenId);
        return tokenExists;
    }

    /**
     *
     * @notice returns winner or the relevant message for the game winner
     * @return string returns the winner of the contract
    */
    function getWinner() public view returns(
        string memory
    ){
        if(keccak256(abi.encodePacked((winner))) != keccak256(abi.encodePacked(("")))){
            return winner;
        }else{
            return "Winner not declared yet";
        }
    }

}
