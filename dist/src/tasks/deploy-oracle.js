"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployOracle = void 0;
// import OracleArtifact from "../../artifacts/@chainlink/contracts/src/v0.4/Oracle.sol/Oracle.json";
const deployOracle = async (taskArgs, hre) => {
    const { nodeAddress, linkAddress } = taskArgs;
    const { getNamedAccounts } = require("hre");
    const deployer = await getNamedAccounts().deployer;
    const Oracle = await hre.ethers.getContractFactory("Operator");
    const oracle = await Oracle.deploy(linkAddress, deployer);
    await oracle.deployed();
    // Set Fulfillment on Oracle
    await oracle.connect(deployer).setAutorizedSenders([nodeAddress]);
    console.log("All set on this end! If you've setup everything correctly, you can start getting external data from your smart contract");
    console.table({ "Oracle Address": oracle.address });
};
exports.deployOracle = deployOracle;
//# sourceMappingURL=deploy-oracle.js.map