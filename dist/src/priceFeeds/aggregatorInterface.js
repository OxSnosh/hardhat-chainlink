"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoricalPrice = exports.getPhaseId = exports.getAggregatorRoundId = exports.getAggregatorAddress = exports.getPriceFeedAggregatorVersion = exports.getRoundData = exports.getPriceFeedDescription = exports.getPriceFeedDecimals = exports.getLatestRoundData = exports.getLatestPrice = void 0;
const ethers_1 = require("ethers");
const types_1 = require("../../types");
const getLatestPrice = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const latestRoundData = await priceFeed.latestRoundData();
    const price = latestRoundData.answer;
    return price;
};
exports.getLatestPrice = getLatestPrice;
const getLatestRoundData = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const latestRoundData = await priceFeed.latestRoundData();
    return {
        roundId: latestRoundData.roundId,
        answer: latestRoundData.answer,
        startedAt: latestRoundData.startedAt,
        updatedAt: latestRoundData.updatedAt,
        answeredInRound: latestRoundData.answeredInRound,
    };
};
exports.getLatestRoundData = getLatestRoundData;
const getPriceFeedDecimals = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    return priceFeed.decimals();
};
exports.getPriceFeedDecimals = getPriceFeedDecimals;
const getPriceFeedDescription = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    return priceFeed.description();
};
exports.getPriceFeedDescription = getPriceFeedDescription;
const getRoundData = async (env, priceFeedAddress, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const roundData = await priceFeed.getRoundData(roundId);
    return {
        roundId: roundData.roundId,
        answer: roundData.answer,
        startedAt: roundData.startedAt,
        updatedAt: roundData.updatedAt,
        answeredInRound: roundData.answeredInRound,
    };
};
exports.getRoundData = getRoundData;
const getPriceFeedAggregatorVersion = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const version = await priceFeed.version();
    return version;
};
exports.getPriceFeedAggregatorVersion = getPriceFeedAggregatorVersion;
const getAggregatorAddress = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    return priceFeed.address;
};
exports.getAggregatorAddress = getAggregatorAddress;
const getAggregatorRoundId = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const roundData = await priceFeed.latestRoundData();
    const aggregatorRoundId = 
    // tslint:disable-next-line:no-bitwise
    roundData.roundId.toBigInt() & BigInt(`0xFFFFFFFFFFFFFFFF`);
    return ethers_1.BigNumber.from(aggregatorRoundId);
};
exports.getAggregatorRoundId = getAggregatorRoundId;
const getPhaseId = async (env, priceFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const roundData = await priceFeed.latestRoundData();
    // tslint:disable-next-line:no-bitwise
    const phaseId = roundData.roundId.toBigInt() >> 64n;
    return ethers_1.BigNumber.from(phaseId);
};
exports.getPhaseId = getPhaseId;
const getHistoricalPrice = async (env, priceFeedAddress, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const priceFeed = types_1.AggregatorV3Interface__factory.connect(priceFeedAddress, signer);
    const roundData = await priceFeed.getRoundData(roundId);
    return roundData.answer;
};
exports.getHistoricalPrice = getHistoricalPrice;
//# sourceMappingURL=aggregatorInterface.js.map