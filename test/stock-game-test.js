const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("Stock Game contract test cases : ", async function () {

    let firstUser;

    before(async () => {
        [firstUser] = await ethers.getSigners();
        console.log(`Testing contract with the account: ${firstUser.address}`);
    });

    // Deploy StockGame smart contract
    it("Should deploy StockGame Smart contract", async function () {
        const StockGame = await ethers.getContractFactory("StockGame");
        stockGame = await StockGame.deploy();
        await stockGame.deployed();
        console.log("StockGame contract deployed at : ", stockGame.address);
    });

    // get winner : negative test
    it("Should return Winner not declared yet", async function () {
        const result = await stockGame.getWinner();
        expect(result).to.be.equal("Winner not declared yet");
    });

    // get token exists : negative test
    it("Should return Invalid Token ID! for token exists", async function () {
        expect(stockGame.getTokenExists(5)).to.be.revertedWith("Invalid Token ID!");
    });

    // balance of : negative test
    it("Should return 0 on bakance check", async function () {
        const result = await stockGame.balanceOf(firstUser.address);
        expect(result).to.be.equal("0");
    });

    // mint new NFT : positive test
    it("Should mint new NFT", async function () {
        const result = await stockGame.mintStockNft(firstUser.address, "TCS", 0, "1200000000000000000");
        await result.wait();
        expect(result);
    });

    // declare winner : positive test
    it("Should declare winner of the game", async function () {
        const result = await stockGame.declareWinner();
        await result.wait();
        const resultOfGame = await stockGame.getWinner();
        expect(resultOfGame).to.be.equal("A");
    });

    // reset winner : positive test
    it("Should return Winner not declared yet", async function () {
        const result = await stockGame.resetWinner();
        await result.wait();
        const resultOfGame = await stockGame.getWinner();
        expect(resultOfGame).to.be.equal("Winner not declared yet");
    });

    // owner of : positive test 
    it("Should return Winner not declared yet", async function () {
        const result = await stockGame.ownerOf("1");
        expect(result).to.be.equal(firstUser.address);
    });

    // update health : positive test 
    it("Should return Winner not declared yet", async function () {
        const result = await stockGame.updateHealth("1", "2100000000000000000");
        await result.wait();
        const data = await stockGame.getTokenMetaData("1");
        expect(data.health).to.be.equal("210000000000000000000");
    });

    // get token meta data : positive test 
    it("Should return Winner not declared yet", async function () {
        const data = await stockGame.getTokenMetaData("1");
        expect(data.ticker).to.be.equal("TCS");
    });
  
});
