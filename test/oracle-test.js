const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("StockMarketDataFetcherOracle contract test cases : ", async function () {

    let firstUser;
    let stockMarketDataFetcherOracle;
    let linkToken;
    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

    before(async () => {
        [firstUser] = await ethers.getSigners();
        console.log(`Testing contract with the account: ${firstUser.address}`);
    });

    // Deploy StockMarketDataFetcherOracle smart contract
    it("Should deploy StockMarketDataFetcherOracle Smart contract", async function () {
        const StockMarketDataFetcherOracle = await ethers.getContractFactory("StockMarketDataFetcherOracle");
        stockMarketDataFetcherOracle = await StockMarketDataFetcherOracle.deploy();
        await stockMarketDataFetcherOracle.deployed();
        console.log("StockMarketDataFetcherOracle contract deployed at : ", stockMarketDataFetcherOracle.address);
    });

    // Get instance of Link token smart contract
    it("Should get instance of Link token smart contract", async function () {
        linkToken = await ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", linkTokenAddress);
        expect(linkToken).not.to.be.equal(null);
    });

    // Transfer Link token to StockMarketDataFetcherOracle smart contract
    it("Should transfer 0.5 Link token to smart contract", async function () {
        const transferResult = await linkToken.transfer(stockMarketDataFetcherOracle.address, "500000000000000000");
        await transferResult.wait();
        const balance = await linkToken.balanceOf(stockMarketDataFetcherOracle.address);
        expect(balance).not.to.be.equal("0");
    });

    // request : positive test
    it("Should call external API", async function () {
        const result = await stockMarketDataFetcherOracle.request("TCS");
        await result.wait();
        expect(result).not.to.be.equal(null);
    });

    // get volume : positive test
    it("Should return volume of ticker TCS", async function () {
        const volume = await new Promise((resolve, reject) => {
            setTimeout(async () => {
                let data = await stockMarketDataFetcherOracle.volume();
                resolve(data);
            }, 15000);
        });
        expect(volume).not.to.be.equal("-1");
    });

});
