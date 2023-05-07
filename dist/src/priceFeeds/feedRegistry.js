"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPhaseId = exports.getNextRoundId = exports.getPreviousRoundId = exports.getPhaseRange = exports.getRoundFeed = exports.getPhase = exports.isFeedEnabled = exports.getPhaseFeed = exports.getFeed = exports.getFeedRegistryProxyAggregatorVersion = exports.getFeedRegistryLatestRoundData = exports.getFeedRegistryRoundData = exports.getFeedRegistryDescription = exports.getFeedRegistryDecimals = exports.Denominations = void 0;
const types_1 = require("../../types");
exports.Denominations = Object.freeze({
    ETH: `0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE`,
    BTC: `0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB`,
    USD: `0x0000000000000000000000000000000000000348`,
    GBP: `0x000000000000000000000000000000000000033a`,
    EUR: `0x00000000000000000000000000000000000003d2`,
    JPY: `0x0000000000000000000000000000000000000188`,
    KRW: `0x000000000000000000000000000000000000019a`,
    CNY: `0x000000000000000000000000000000000000009c`,
    AUD: `0x0000000000000000000000000000000000000024`,
    CAD: `0x000000000000000000000000000000000000007c`,
    CHF: `0x00000000000000000000000000000000000002F4`,
    ARS: `0x0000000000000000000000000000000000000020`,
    PHP: `0x0000000000000000000000000000000000000260`,
    NZD: `0x000000000000000000000000000000000000022A`,
    SGD: `0x00000000000000000000000000000000000002be`,
    NGN: `0x0000000000000000000000000000000000000236`,
    ZAR: `0x00000000000000000000000000000000000002c6`,
    RUB: `0x0000000000000000000000000000000000000283`,
    INR: `0x0000000000000000000000000000000000000164`,
    BRL: `0x00000000000000000000000000000000000003Da`,
});
const getFeedRegistryDecimals = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    return feedRegistry.decimals(base, quote);
};
exports.getFeedRegistryDecimals = getFeedRegistryDecimals;
const getFeedRegistryDescription = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    return feedRegistry.description(base, quote);
};
exports.getFeedRegistryDescription = getFeedRegistryDescription;
const getFeedRegistryRoundData = async (env, feedRegistryAddress, base, quote, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const roundData = await feedRegistry.getRoundData(base, quote, roundId);
    return {
        roundId: roundData.roundId,
        answer: roundData.answer,
        startedAt: roundData.startedAt,
        updatedAt: roundData.updatedAt,
        answeredInRound: roundData.answeredInRound,
    };
};
exports.getFeedRegistryRoundData = getFeedRegistryRoundData;
const getFeedRegistryLatestRoundData = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const roundData = await feedRegistry.latestRoundData(base, quote);
    return {
        roundId: roundData.roundId,
        answer: roundData.answer,
        startedAt: roundData.startedAt,
        updatedAt: roundData.updatedAt,
        answeredInRound: roundData.answeredInRound,
    };
};
exports.getFeedRegistryLatestRoundData = getFeedRegistryLatestRoundData;
const getFeedRegistryProxyAggregatorVersion = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const version = await feedRegistry.version(base, quote);
    return version;
};
exports.getFeedRegistryProxyAggregatorVersion = getFeedRegistryProxyAggregatorVersion;
const getFeed = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const feedAddress = await feedRegistry.getFeed(base, quote);
    return feedAddress;
};
exports.getFeed = getFeed;
const getPhaseFeed = async (env, feedRegistryAddress, base, quote, phaseId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const feedAddress = await feedRegistry.getPhaseFeed(base, quote, phaseId);
    return feedAddress;
};
exports.getPhaseFeed = getPhaseFeed;
const isFeedEnabled = async (env, feedRegistryAddress, aggregatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    return feedRegistry.isFeedEnabled(aggregatorAddress);
};
exports.isFeedEnabled = isFeedEnabled;
const getPhase = async (env, feedRegistryAddress, base, quote, phaseId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const phase = await feedRegistry.getPhase(base, quote, phaseId);
    return {
        phaseId: phase.phaseId,
        startingAggregatorRoundId: phase.startingAggregatorRoundId,
        endingAggregatorRoundId: phase.endingAggregatorRoundId,
    };
};
exports.getPhase = getPhase;
const getRoundFeed = async (env, feedRegistryAddress, base, quote, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const aggregatorAddress = await feedRegistry.getRoundFeed(base, quote, roundId);
    return aggregatorAddress;
};
exports.getRoundFeed = getRoundFeed;
const getPhaseRange = async (env, feedRegistryAddress, base, quote, phaseId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const phaseRange = await feedRegistry.getPhaseRange(base, quote, phaseId);
    return {
        startingRoundId: phaseRange.startingRoundId,
        endingRoundId: phaseRange.endingRoundId,
    };
};
exports.getPhaseRange = getPhaseRange;
const getPreviousRoundId = async (env, feedRegistryAddress, base, quote, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const previousRoundId = await feedRegistry.getPreviousRoundId(base, quote, roundId);
    return previousRoundId;
};
exports.getPreviousRoundId = getPreviousRoundId;
const getNextRoundId = async (env, feedRegistryAddress, base, quote, roundId) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const nextRoundId = await feedRegistry.getNextRoundId(base, quote, roundId);
    return nextRoundId;
};
exports.getNextRoundId = getNextRoundId;
const getCurrentPhaseId = async (env, feedRegistryAddress, base, quote) => {
    const [signer] = await env.ethers.getSigners();
    const feedRegistry = types_1.FeedRegistryInterface__factory.connect(feedRegistryAddress, signer);
    const currentPhaseId = await feedRegistry.getCurrentPhaseId(base, quote);
    return currentPhaseId;
};
exports.getCurrentPhaseId = getCurrentPhaseId;
//# sourceMappingURL=feedRegistry.js.map