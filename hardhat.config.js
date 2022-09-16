require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true
    },
    matic: {
      url: process.env.MUMBAI_TESTNET_RPC_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`, `0x${process.env.PRIVATE_KEY_ACCOUNT_2}`],
      chainId: 80001,
      allowUnlimitedContractSize: true,
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 10000000000
  }
};
