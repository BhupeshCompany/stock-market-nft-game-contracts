// SPDX-License-Identifier: NONE
pragma solidity 0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


/**
 *
 * @author Bhupesh Dubey
*/
contract StockMarketDataFetcherOracle is ChainlinkClient, ConfirmedOwner {

    using Chainlink for Chainlink.Request;

    int256 public volume;
    bytes32 private jobId;
    uint256 public fee;

    event RequestVolume(
        bytes32 indexed requestId, 
        int256 volume
    );

    /**
     * @notice Initialize the link token and target oracle
     *
     * Polygon Mumbai Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0x40193c8518BB267228Fc409a613bDbD8eC5a97b3 (Chainlink DevRel)
     * jobId: fcf4140d696d44b687012232948bdd5d
     *
     */
    constructor() ConfirmedOwner(msg.sender) {
        setChainlinkToken(0x326C977E6efc84E512bB9C30f76E30c160eD06FB);
        setChainlinkOracle(0x40193c8518BB267228Fc409a613bDbD8eC5a97b3);
        jobId = "fcf4140d696d44b687012232948bdd5d";
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)
    }

    /**
     *
     * @notice fetches the data from external API call
     * @param _ticker ticker name of particular stock of company
    */
    function request(
        string memory _ticker
    ) public {
        bytes memory urlBytes;
        urlBytes = abi.encodePacked("https://mystock222.herokuapp.com/price?ticker=");
        urlBytes = abi.encodePacked(urlBytes,_ticker);
        string memory url = string(urlBytes);
        
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        req.add("get", url);
        req.add("path", "price");
        req.addInt("times", 10**18); // Multiply by times value to remove decimals.
        sendChainlinkRequest(req, (1 * LINK_DIVISIBILITY) / 10); // 0,1*10**18 LINK
    }

    /**
     *
     * @notice receives the response in the form of int
     * @param _requestId request id of the API call
     * @param _volume data returned from the API call
    */
    function fulfill(
        bytes32 _requestId, 
        int256 _volume
    ) public recordChainlinkFulfillment(
        _requestId
    ) {
        volume = _volume;
    }

    /**
     *
     * @notice allows to withdraw of Link tokens from the contract
    */
    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

}
