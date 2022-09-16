# Stock Game

## Description:
 
Stock Game is a NFT based platform where Company & Industry owner's can only mint new NFT based on their Ticker name in the Global Stock Market like (Yahoo Finance). Users will get their NFT's be part of any one team either team A or Team B. Depends in which team user wants to play game.
The GAME is about each team A and B will have 5 members each (Stocks) and based on the sum of the health of all members of a team winning team is decided. Winning team enjoys the gifts provided by the platform.

### Important Points :

- Built on Polygon Mumbai blockchain
- StockMarketDataFetcherOracle is contract that fetches stock market data by calling API's
- StockMarketDataFetcherOracle must have enough LINK tokens
- Only owner of the contract can mint the new tokens
- Only users (Stocks) can participate in the game
- Contract automatically fetches health from API's and does calculation accordingly
- Winner is decided based on sum of health of each member of th team
- Winner can be declared by the owner only

### Techologies Used:

- Hardhat
- Solidity

### List of Libraries/Framework used:

- Mocha
- Chai
- Ethers
- Openzepplin
- Chainlink
- BigNumber

### Directory layout
       
├── contracts                    
├── docs                    
├── scripts                   
├── test             
└── README.md

### How to install and run :

- Run `npm install` to install all dependencies

- Run `npx hardhat compile` to compile all the contracts

- Run `npx hardhat run scripts/deployment-script.js --network matic` to deploy all the contracts and fetch result

### Run Test Cases :

- Run `npx hardhat test` to execute all the testcases of the contracts
- Run `npx hardhat test test/stock-game-test.js --network matic` to execute a StockGame testfile
- Run `npx hardhat test test/oracle-test.js --network matic` to execute a Oracle testfile

### Contracts

| S No. |         Contract Name          |                   Description                      |
|-------|--------------------------------|----------------------------------------------------|
|   1   |           StockGame            |         A NFT contract based on Stock Markt        |
|   2   |  StockMarketDataFetcherOracle  |     Oracle contract to fetch stock market data     |
