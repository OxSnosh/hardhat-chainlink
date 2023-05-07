"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeSinceLayer2SequencerIsUp = exports.isLayer2SequencerUp = void 0;
const ethers_1 = require("ethers");
const l2SequencerUptimeStatusFeed_abi_json_1 = __importDefault(require("../abis/l2SequencerUptimeStatusFeed.abi.json"));
const isLayer2SequencerUp = async (env, sequencerUptimeFeedAddress) => {
    const [signer] = await env.ethers.getSigners();
    const sequencerUptimeFeed = new ethers_1.Contract(sequencerUptimeFeedAddress, l2SequencerUptimeStatusFeed_abi_json_1.default, signer);
    const roundData = await sequencerUptimeFeed.latestRoundData();
    const isSequencerUp = roundData.answer === ethers_1.constants.Zero ? true : false;
    return isSequencerUp;
};
exports.isLayer2SequencerUp = isLayer2SequencerUp;
const getTimeSinceLayer2SequencerIsUp = async (env, sequencerUptimeFeedAddress, gracePeriodTime = ethers_1.BigNumber.from(3600)) => {
    const [signer] = await env.ethers.getSigners();
    const sequencerUptimeFeed = new ethers_1.Contract(sequencerUptimeFeedAddress, l2SequencerUptimeStatusFeed_abi_json_1.default, signer);
    const roundData = await sequencerUptimeFeed.latestRoundData();
    const isSequencerUp = roundData.answer === ethers_1.constants.Zero ? true : false;
    let timeSinceUp;
    let isGracePeriodOver;
    if (!isSequencerUp) {
        timeSinceUp = ethers_1.BigNumber.from(0);
        isGracePeriodOver = false;
    }
    else {
        const latestBlock = await env.ethers.provider.getBlock("latest");
        timeSinceUp = ethers_1.BigNumber.from(latestBlock.timestamp).sub(roundData.startedAt);
        isGracePeriodOver = timeSinceUp.gt(gracePeriodTime) ? true : false;
    }
    return {
        isSequencerUp,
        timeSinceUp,
        isGracePeriodOver,
    };
};
exports.getTimeSinceLayer2SequencerIsUp = getTimeSinceLayer2SequencerIsUp;
//# sourceMappingURL=layer2SequencerUptimeFeeds.js.map