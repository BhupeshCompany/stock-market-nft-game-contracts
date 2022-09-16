const hre = require("hardhat");
const { BigNumber } = require("ethers");

async function main() {

    const linkTokenAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
    const decimals = "1000000000000000000";
    let volume;

    // NOTE : Team 0 means Team A and Team 1 means Team B based on ENUM in smart contract 
    const cscoData = { ticker: "CSCO", team: 0 };
    const tcsData = { ticker: "TCS", team: 0 };
    const relianceData = { ticker: "RELIANCE", team: 0 };
    const saudiArabData = { ticker: "2222", team: 0 };
    const chinaPowerData = { ticker: "002630", team: 0 };
    const bancoBrazilData = { ticker: "BBAS3", team: 1 };
    const balfourData = { ticker: "BBY", team: 1 };
    const zomatoData = { ticker: "ZOMATO", team: 1 };
    const jiangsuData = { ticker: "002471", team: 1 };
    const toyotaData = { ticker: "TM", team: 1 };

    // Get deployer accounts
    [user_1, user_2] = await ethers.getSigners();
    console.log(`Deploying contracts with the account: ${user_1.address}`);
    console.log("================================================================================");

    // Get Link Token contract instance
    linkToken = await hre.ethers.getContractAt("@openzeppelin/contracts/token/ERC20/IERC20.sol:IERC20", linkTokenAddress);
    console.log("Link Token contract connected at :", linkTokenAddress);
    console.log("================================================================================");

    // Deploying StockMarketDataFetcherOracle contract
    const StockMarketDataFetcherOracle = await hre.ethers.getContractFactory("StockMarketDataFetcherOracle");
    const stockMarketDataFetcherOracle = await StockMarketDataFetcherOracle.deploy();
    await stockMarketDataFetcherOracle.deployed();
    console.log("StockMarketDataFetcherOracle contract deployed to :", stockMarketDataFetcherOracle.address);
    console.log("================================================================================");

    // Deploying StockGame contract
    const StockGame = await hre.ethers.getContractFactory("StockGame");
    const stockGame = await StockGame.deploy();
    await stockGame.deployed();
    console.log("StockGame contract deployed to :", stockGame.address);
    console.log("================================================================================");

    // Transfer 1 Link Token from user_1 to StockMarketDataFetcherOracle contract
    const transferResult = await linkToken.transfer(stockMarketDataFetcherOracle.address, "3000000000000000000");
    await transferResult.wait();
    console.log("Transferred 3 Link Token to StockMarketDataFetcherOracle contract");
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const cscoApiCall = await stockMarketDataFetcherOracle.request(cscoData.ticker);
    await cscoApiCall.wait();
    console.log("Called Oracle to fetch health of CSCO ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for CSCO ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint CSCO NFT
    const cscoNftMinted = await stockGame.mintStockNft(
        user_1.address,
        cscoData.ticker,
        cscoData.team,
        volume
    );
    await cscoNftMinted.wait();

    // Fetch CSCO NFT token data
    const fetchedCscoNftData = await stockGame.getTokenMetaData(1);
    console.log("CSCO NFT minted data : ", fetchedCscoNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const tcsApiCall = await stockMarketDataFetcherOracle.request(tcsData.ticker);
    await tcsApiCall.wait();
    console.log("Called Oracle to fetch health of TCS ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for TCS ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint CSCO NFT
    const tcsNftMinted = await stockGame.mintStockNft(
        user_1.address,
        tcsData.ticker,
        tcsData.team,
        volume
    );
    await tcsNftMinted.wait();

    // Fetch TCS NFT token data
    const fetchedTcsNftData = await stockGame.getTokenMetaData(2);
    console.log("TCS NFT minted data : ", fetchedTcsNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const relianceApiCall = await stockMarketDataFetcherOracle.request(relianceData.ticker);
    await relianceApiCall.wait();
    console.log("Called Oracle to fetch health of RELIANCE ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for RELIANCE ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint RELIANCE NFT
    const relianceNftMinted = await stockGame.mintStockNft(
        user_1.address,
        relianceData.ticker,
        relianceData.team,
        volume
    );
    await relianceNftMinted.wait();

    // Fetch RELIANCE NFT token data
    const fetchedRelianceNftData = await stockGame.getTokenMetaData(3);
    console.log("RELIANCE NFT minted data : ", fetchedRelianceNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const saudiArabApiCall = await stockMarketDataFetcherOracle.request(saudiArabData.ticker);
    await saudiArabApiCall.wait();
    console.log("Called Oracle to fetch health of SAUDI ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for SAUDI ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint SAUDI NFT
    const saudiNftMinted = await stockGame.mintStockNft(
        user_1.address,
        saudiArabData.ticker,
        saudiArabData.team,
        volume
    );
    await saudiNftMinted.wait();

    // Fetch SAUDI NFT token data
    const fetchedSaudiNftData = await stockGame.getTokenMetaData(4);
    console.log("SAUDI NFT minted data : ", fetchedSaudiNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const chinaApiCall = await stockMarketDataFetcherOracle.request(chinaPowerData.ticker);
    await chinaApiCall.wait();
    console.log("Called Oracle to fetch health of CHINA ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for CHINA ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint CHINA NFT
    const chinaNftMinted = await stockGame.mintStockNft(
        user_1.address,
        chinaPowerData.ticker,
        chinaPowerData.team,
        volume
    );
    await chinaNftMinted.wait();

    // Fetch CHINA NFT token data
    const fetchedChinaNftData = await stockGame.getTokenMetaData(5);
    console.log("CHINA NFT minted data : ", fetchedChinaNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const brazilApiCall = await stockMarketDataFetcherOracle.request(bancoBrazilData.ticker);
    await brazilApiCall.wait();
    console.log("Called Oracle to fetch health of BRAZIL ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for BRAZIL ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint BRAZIL NFT
    const brazilNftMinted = await stockGame.mintStockNft(
        user_2.address,
        bancoBrazilData.ticker,
        bancoBrazilData.team,
        volume
    );
    await brazilNftMinted.wait();

    // Fetch BRAZIL NFT token data
    const fetchedBrazilNftData = await stockGame.getTokenMetaData(6);
    console.log("BRAZIL NFT minted data : ", fetchedBrazilNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const balfourApiCall = await stockMarketDataFetcherOracle.request(balfourData.ticker);
    await balfourApiCall.wait();
    console.log("Called Oracle to fetch health of BALFOUR ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for BALFOUR ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint BALFOUR NFT
    const balfourNftMinted = await stockGame.mintStockNft(
        user_2.address,
        balfourData.ticker,
        balfourData.team,
        volume
    );
    await balfourNftMinted.wait();

    // Fetch BALFOUR NFT token data
    const fetchedBalfourNftData = await stockGame.getTokenMetaData(7);
    console.log("BALFOUR NFT minted data : ", fetchedBalfourNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const zomatoApiCall = await stockMarketDataFetcherOracle.request(zomatoData.ticker);
    await zomatoApiCall.wait();
    console.log("Called Oracle to fetch health of ZOMATO ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for ZOMATO ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint ZOMATO NFT
    const zomatoNftMinted = await stockGame.mintStockNft(
        user_2.address,
        zomatoData.ticker,
        zomatoData.team,
        volume
    );
    await zomatoNftMinted.wait();

    // Fetch ZOMATO NFT token data
    const fetchedZomatoNftData = await stockGame.getTokenMetaData(8);
    console.log("ZOMATO NFT minted data : ", fetchedZomatoNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const jiangsuApiCall = await stockMarketDataFetcherOracle.request(jiangsuData.ticker);
    await jiangsuApiCall.wait();
    console.log("Called Oracle to fetch health of JIANGSU ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for JIANGSU ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint JIANGSU NFT
    const jiangsuNftMinted = await stockGame.mintStockNft(
        user_2.address,
        jiangsuData.ticker,
        jiangsuData.team,
        volume
    );
    await jiangsuNftMinted.wait();

    // Fetch JIANGSU NFT token data
    const fetchedJiangsuNftData = await stockGame.getTokenMetaData(9);
    console.log("JIANGSU NFT minted data : ", fetchedJiangsuNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle
    const toyotaApiCall = await stockMarketDataFetcherOracle.request(toyotaData.ticker);
    await toyotaApiCall.wait();
    console.log("Called Oracle to fetch health of TOYOTA ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for TOYOTA ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Mint TOYOTA NFT
    const toyotaNftMinted = await stockGame.mintStockNft(
        user_2.address,
        toyotaData.ticker,
        toyotaData.team,
        volume
    );
    await toyotaNftMinted.wait();

    // Fetch TOYOTA NFT token data
    const fetchedToyotaNftData = await stockGame.getTokenMetaData(10);
    console.log("TOYOTA NFT minted data : ", fetchedToyotaNftData);
    console.log("================================================================================");

    // Get the winner, but its not declared yet
    const winner = await stockGame.getWinner();
    console.log("Winner before winner declared : ", winner);
    console.log("================================================================================");

    // Waiting for 2 minutes (assuming 1 day is completed and now again we will get new health of all the tickers and update it in the smart contract and accordingly declare winner team)
    console.log("Waiting for 2 minutes, after that we will fetch new health's of all the tickers");
    console.log("================================================================================");
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            resolve("");
        }, 120000);
    });
    console.log("Waiting time for 2 minutes finished , now fetch fresh health's of the tickers");
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateCscoApiCall = await stockMarketDataFetcherOracle.request(cscoData.ticker);
    await updateCscoApiCall.wait();
    console.log("Called Oracle to fetch health of CSCO ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for CSCO ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of CSCO ticker in NFT 
    const cscoResult = await stockGame.updateHealth(1, volume);
    await cscoResult.wait();

    // Fetch CSCO NFT token data
    const updatedCscoNftData = await stockGame.getTokenMetaData(1);
    console.log("Updated health in CSCO NFT data : ", updatedCscoNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateTcsApiCall = await stockMarketDataFetcherOracle.request(tcsData.ticker);
    await updateTcsApiCall.wait();
    console.log("Called Oracle to fetch health of TCS ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for TCS ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of TCS ticker in NFT 
    const tcsResult = await stockGame.updateHealth(2, volume);
    await tcsResult.wait();

    // Fetch TCS NFT token data
    const updatedTcsNftData = await stockGame.getTokenMetaData(2);
    console.log("Updated health in TCS NFT data : ", updatedTcsNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateRelianceApiCall = await stockMarketDataFetcherOracle.request(relianceData.ticker);
    await updateRelianceApiCall.wait();
    console.log("Called Oracle to fetch health of RELIANCE ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for RELIANCE ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of RELIANCE ticker in NFT 
    const relianceResult = await stockGame.updateHealth(3, volume);
    await relianceResult.wait();

    // Fetch RELIANCE NFT token data
    const updatedRelianceNftData = await stockGame.getTokenMetaData(3);
    console.log("Updated health in RELIANCE NFT data : ", updatedRelianceNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateSaudiApiCall = await stockMarketDataFetcherOracle.request(saudiArabData.ticker);
    await updateSaudiApiCall.wait();
    console.log("Called Oracle to fetch health of SAUDI ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for SAUDI ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of SAUDI ticker in NFT 
    const saudiResult = await stockGame.updateHealth(4, volume);
    await saudiResult.wait();

    // Fetch SAUDI NFT token data
    const updatedSaudiNftData = await stockGame.getTokenMetaData(4);
    console.log("Updated health in SAUDI NFT data : ", updatedSaudiNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateChinaApiCall = await stockMarketDataFetcherOracle.request(chinaPowerData.ticker);
    await updateChinaApiCall.wait();
    console.log("Called Oracle to fetch health of CHINA ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for CHINA ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of CHINA ticker in NFT 
    const chinaResult = await stockGame.updateHealth(5, volume);
    await chinaResult.wait();

    // Fetch CHINA NFT token data
    const updatedChinaNftData = await stockGame.getTokenMetaData(5);
    console.log("Updated health in CHINA NFT data : ", updatedChinaNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateBrazilApiCall = await stockMarketDataFetcherOracle.request(bancoBrazilData.ticker);
    await updateBrazilApiCall.wait();
    console.log("Called Oracle to fetch health of BRAZIL ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for BRAZIL ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of BRAZIL ticker in NFT 
    const brazilResult = await stockGame.updateHealth(6, volume);
    await brazilResult.wait();

    // Fetch BRAZIL NFT token data
    const updatedBrazilNftData = await stockGame.getTokenMetaData(6);
    console.log("Updated health in BRAZIL NFT data : ", updatedBrazilNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateBalfourApiCall = await stockMarketDataFetcherOracle.request(balfourData.ticker);
    await updateBalfourApiCall.wait();
    console.log("Called Oracle to fetch health of BALFOUR ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for BALFOUR ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of BALFOUR ticker in NFT 
    const balfourResult = await stockGame.updateHealth(7, volume);
    await balfourResult.wait();

    // Fetch BALFOUR NFT token data
    const updatedBalfourNftData = await stockGame.getTokenMetaData(7);
    console.log("Updated health in BALFOUR NFT data : ", updatedBalfourNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateZomatoApiCall = await stockMarketDataFetcherOracle.request(zomatoData.ticker);
    await updateZomatoApiCall.wait();
    console.log("Called Oracle to fetch health of ZOMATO ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for ZOMATO ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of ZOMATO ticker in NFT 
    const zomatoResult = await stockGame.updateHealth(8, volume);
    await zomatoResult.wait();

    // Fetch ZOMATO NFT token data
    const updatedZomatoNftData = await stockGame.getTokenMetaData(8);
    console.log("Updated health in ZOMATO NFT data : ", updatedZomatoNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateJiangsuApiCall = await stockMarketDataFetcherOracle.request(jiangsuData.ticker);
    await updateJiangsuApiCall.wait();
    console.log("Called Oracle to fetch health of JIANGSU ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for JIANGSU ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of JIANGSU ticker in NFT 
    const jiangsuResult = await stockGame.updateHealth(9, volume);
    await jiangsuResult.wait();

    // Fetch JIANGSU NFT token data
    const updatedJiangsuNftData = await stockGame.getTokenMetaData(9);
    console.log("Updated health in JIANGSU NFT data : ", updatedJiangsuNftData);
    console.log("================================================================================");

    // Call request function of StockMarketDataFetcherOracle for updating health
    const updateToyotaApiCall = await stockMarketDataFetcherOracle.request(toyotaData.ticker);
    await updateToyotaApiCall.wait();
    console.log("Called Oracle to fetch health of TOYOTA ticker");
    console.log("================================================================================");

    // Wait for 15 seconds and then call volume() of StockMarketDataFetcherOracle
    volume = await new Promise((resolve, reject) => {
        setTimeout(async () => {
            let data = await stockMarketDataFetcherOracle.volume();
            resolve(data);
        }, 15000);
    });
    console.log("Health fetched for TOYOTA ticker : ", (BigNumber.from(volume).div(BigNumber.from(decimals))).toString());
    console.log("================================================================================");

    // Update health of TOYOTA ticker in NFT 
    const toyotaResult = await stockGame.updateHealth(10, volume);
    await toyotaResult.wait();

    // Fetch TOYOTA NFT token data
    const updatedToyotaNftData = await stockGame.getTokenMetaData(10);
    console.log("Updated health in TOYOTA NFT data : ", updatedToyotaNftData);
    console.log("================================================================================");

    // Owner declares the winner based on the overall health of the team
    const winnerDeclared = await stockGame.declareWinner();
    await winnerDeclared.wait();

    // Get the winning team
    const winnerTeam = await stockGame.getWinner();
    console.log("Game is over now, The Winning team is : ", winnerTeam);
    console.log("================================================================================");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
