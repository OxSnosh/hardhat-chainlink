"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhaseIdOfAggregator = exports.getTypeAndVersionOfAggregator = exports.getLatestRoundIdOfAggregator = exports.getLatestTimestampOfAggregator = exports.getRoundTimestampOfAggregator = exports.getHistoricalPriceFromAggregator = void 0;
const ethers_1 = require("ethers");
const accessControlledOffchainAggregator_abi_json_1 = __importDefault(require("../abis/accessControlledOffchainAggregator.abi.json"));
const getHistoricalPriceFromAggregator = async (env, aggregatorAddress, aggregatorRoundId) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const price = await aggregator.getAnswer(aggregatorRoundId);
    return price;
};
exports.getHistoricalPriceFromAggregator = getHistoricalPriceFromAggregator;
const getRoundTimestampOfAggregator = async (env, aggregatorAddress, aggregatorRoundId) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const timestamp = await aggregator.getTimestamp(aggregatorRoundId);
    return timestamp;
};
exports.getRoundTimestampOfAggregator = getRoundTimestampOfAggregator;
const getLatestTimestampOfAggregator = async (env, aggregatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const timestamp = await aggregator.latestTimestamp();
    return timestamp;
};
exports.getLatestTimestampOfAggregator = getLatestTimestampOfAggregator;
const getLatestRoundIdOfAggregator = async (env, aggregatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const aggregatorRoundId = await aggregator.latestRound();
    return aggregatorRoundId;
};
exports.getLatestRoundIdOfAggregator = getLatestRoundIdOfAggregator;
const getTypeAndVersionOfAggregator = async (env, aggregatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const typeAndVersion = await aggregator.typeAndVersion();
    return typeAndVersion;
};
exports.getTypeAndVersionOfAggregator = getTypeAndVersionOfAggregator;
const getPhaseIdOfAggregator = async (env, aggregatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const aggregator = new ethers_1.Contract(aggregatorAddress, accessControlledOffchainAggregator_abi_json_1.default, signer);
    const version = await aggregator.version();
    return version;
};
exports.getPhaseIdOfAggregator = getPhaseIdOfAggregator;
//# sourceMappingURL=accessControlledOffchainAggregator.js.map