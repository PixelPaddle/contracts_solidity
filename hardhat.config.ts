import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import "@openzeppelin/hardhat-upgrades"
require('dotenv').config()
var global: any = {}
const fs = require("fs");

function prepareConfig() {
  // expected config path
  const configPath = `${__dirname}/deployment_config.ts`;
  
  // create dummy object if deployment config doesn't exist
  // for compilation purposes
  if (fs.existsSync(configPath)) {
    global.DeploymentConfig = require(configPath);
  } else {
    global.DeploymentConfig = {};
  }
}
prepareConfig();
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10000,
      },
    },
  },
  networks: {
    ethereum: {
      chainId: 1,
      url: global.DeploymentConfig.ethereum.rpc,
      accounts: [
        `${global.DeploymentConfig.ethereum.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
    polygon: {
      chainId: 137,
      url: global.DeploymentConfig.polygon.rpc,
      accounts: [
        `${global.DeploymentConfig.polygon.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
    polygonAmoy: {
      chainId: 80002,
      url: global.DeploymentConfig.polygonAmoy.rpc,
      accounts: [
        `${global.DeploymentConfig.polygonAmoy.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
    
    polygonMumbai: {
      chainId: 80001,
      url: global.DeploymentConfig.polygonMumbai.rpc,
      accounts: [
        `${global.DeploymentConfig.polygonMumbai.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
    skale: {
      chainId: 0x50877ed6,
      url: global.DeploymentConfig.skaleMainnet.rpc,
      accounts: [
        `${global.DeploymentConfig.skaleMainnet.mnemonic}`,
      ],
      loggingEnabled: true,
      throwOnTransactionFailures: true,
    },
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      avalancheFujiTestnet: process.env.SNOW_TRACE_KEY || "",
      polygon: process.env.POLYGON_API_KEY || "",
      polygonMumbai: process.env.POLYGON_API_KEY || "",
      skale: process.env.ETHERSCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "skale",
        chainId: parseInt("0x50877ed6"),
        urls: {
          apiURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com/api",
          browserURL: "https://staging-fast-active-bellatrix.explorer.staging-v3.skalenodes.com",
        }
      }
    ]
  },
  
};

export default config;
