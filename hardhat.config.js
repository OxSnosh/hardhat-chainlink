require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
// require('./dist')

const commonCompilerSettings = {
  optimizer: {
    enabled: true,
    runs: 1_000,
  },
}

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545'
    },
    hardhat: {
      // See its defaults
    }
  },
  solidity: {
    compilers: [
      {
        version: '0.8.6',
        settings: commonCompilerSettings,
      },
      {
        version: '0.4.24',
        settings: commonCompilerSettings,
      },
      {
        version: '0.6.0',
        settings: commonCompilerSettings,
      }
    ]
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  }
}

