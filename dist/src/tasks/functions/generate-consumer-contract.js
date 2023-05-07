"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateConsumerContract = void 0;
const fs_1 = __importDefault(require("fs"));
const generateConsumerContract = async (taskArgs, hre) => {
    const dstDir = `${hre.config.paths.root}/contracts`;
    const dst = `${dstDir}/FunctionsConsumer.sol`;
    if (!fs_1.default.existsSync(dstDir)) {
        fs_1.default.mkdirSync(dstDir);
    }
    if (fs_1.default.existsSync(dst)) {
        throw new Error("Contract file exists: " + dst);
    }
    const src = `${hre.config.paths.root}/node_modules/@chainlink/hardhat-chainlink/contracts/FunctionsConsumer.sol`;
    fs_1.default.copyFileSync(src, dst);
    console.log(`FunctionsConsumer.sol is saved as ${dst}, now compiling...`);
    await hre.run("compile");
};
exports.generateConsumerContract = generateConsumerContract;
//# sourceMappingURL=generate-consumer-contract.js.map