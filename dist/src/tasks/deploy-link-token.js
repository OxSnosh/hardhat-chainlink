"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployLinkToken = void 0;
const LinkToken_json_1 = __importDefault(require("../../artifacts/@chainlink/contracts/src/v0.4/LinkToken.sol/LinkToken.json"));
const deployLinkToken = async (taskArguments, hre) => {
    const LinkToken = await hre.ethers.getContractFactoryFromArtifact(LinkToken_json_1.default);
    const linkToken = await LinkToken.deploy();
    await linkToken.deployed();
    console.table({ "Link Token Address": linkToken.address });
};
exports.deployLinkToken = deployLinkToken;
//# sourceMappingURL=deploy-link-token.js.map