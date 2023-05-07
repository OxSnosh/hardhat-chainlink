"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardhatChainlink = void 0;
require("@nomiclabs/hardhat-ethers");
const ethers_1 = require("ethers");
const automation_1 = require("./automation");
const functions_1 = require("./functions");
const priceFeeds_1 = require("./priceFeeds");
const vrf_1 = require("./vrf");
class HardhatChainlink {
    constructor(env) {
        this.env = env;
        this.denominations = priceFeeds_1.Denominations;
    }
    async getLatestPrice(priceFeedAddress) {
        return (0, priceFeeds_1.getLatestPrice)(this.env, priceFeedAddress);
    }
    async getLatestRoundData(dataFeedAddress) {
        return (0, priceFeeds_1.getLatestRoundData)(this.env, dataFeedAddress);
    }
    async getPriceFeedDecimals(priceFeedAddress) {
        return (0, priceFeeds_1.getPriceFeedDecimals)(this.env, priceFeedAddress);
    }
    async getPriceFeedDescription(priceFeedAddress) {
        return (0, priceFeeds_1.getPriceFeedDescription)(this.env, priceFeedAddress);
    }
    async getRoundData(priceFeedAddress, roundId) {
        return (0, priceFeeds_1.getRoundData)(this.env, priceFeedAddress, roundId);
    }
    async getAggregatorAddress(priceFeedAddress) {
        return (0, priceFeeds_1.getAggregatorAddress)(this.env, priceFeedAddress);
    }
    async getAggregatorRoundId(priceFeedAddress) {
        return (0, priceFeeds_1.getAggregatorRoundId)(this.env, priceFeedAddress);
    }
    async getPhaseId(priceFeedAddress) {
        return (0, priceFeeds_1.getPhaseId)(this.env, priceFeedAddress);
    }
    async getHistoricalPrice(priceFeedAddress, roundId) {
        return (0, priceFeeds_1.getHistoricalPrice)(this.env, priceFeedAddress, roundId);
    }
    async getPriceFeedAggregatorVersion(priceFeedAddress) {
        return (0, priceFeeds_1.getPriceFeedAggregatorVersion)(this.env, priceFeedAddress);
    }
    async resolveEnsAggregatorAddress(baseTick, quoteTick) {
        return (0, priceFeeds_1.resolveEnsAggregatorAddress)(this.env, baseTick, quoteTick);
    }
    async resolveEnsAggregatorAddressWithSubdomains(baseTick, quoteTick) {
        return (0, priceFeeds_1.resolveEnsAggregatorAddressWithSubdomains)(this.env, baseTick, quoteTick);
    }
    async getFeedRegistryDecimals(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getFeedRegistryDecimals)(this.env, feedRegistryAddress, base, quote);
    }
    async getFeedRegistryDescription(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getFeedRegistryDescription)(this.env, feedRegistryAddress, base, quote);
    }
    async getFeedRegistryRoundData(feedRegistryAddress, base, quote, roundId) {
        return (0, priceFeeds_1.getFeedRegistryRoundData)(this.env, feedRegistryAddress, base, quote, roundId);
    }
    async getFeedRegistryLatestRoundData(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getFeedRegistryLatestRoundData)(this.env, feedRegistryAddress, base, quote);
    }
    async getFeedRegistryProxyAggregatorVersion(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getFeedRegistryProxyAggregatorVersion)(this.env, feedRegistryAddress, base, quote);
    }
    async getFeed(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getFeed)(this.env, feedRegistryAddress, base, quote);
    }
    async getPhaseFeed(feedRegistryAddress, base, quote, phaseId) {
        return (0, priceFeeds_1.getPhaseFeed)(this.env, feedRegistryAddress, base, quote, phaseId);
    }
    async isFeedEnabled(feedRegistryAddress, aggregatorAddress) {
        return (0, priceFeeds_1.isFeedEnabled)(this.env, feedRegistryAddress, aggregatorAddress);
    }
    async getPhase(feedRegistryAddress, base, quote, phaseId) {
        return (0, priceFeeds_1.getPhase)(this.env, feedRegistryAddress, base, quote, phaseId);
    }
    async getRoundFeed(feedRegistryAddress, base, quote, roundId) {
        return (0, priceFeeds_1.getRoundFeed)(this.env, feedRegistryAddress, base, quote, roundId);
    }
    async getPhaseRange(feedRegistryAddress, base, quote, phaseId) {
        return (0, priceFeeds_1.getPhaseRange)(this.env, feedRegistryAddress, base, quote, phaseId);
    }
    async getPreviousRoundId(feedRegistryAddress, base, quote, roundId) {
        return (0, priceFeeds_1.getPreviousRoundId)(this.env, feedRegistryAddress, base, quote, roundId);
    }
    async getNextRoundId(feedRegistryAddress, base, quote, roundId) {
        return (0, priceFeeds_1.getNextRoundId)(this.env, feedRegistryAddress, base, quote, roundId);
    }
    async getCurrentPhaseId(feedRegistryAddress, base, quote) {
        return (0, priceFeeds_1.getCurrentPhaseId)(this.env, feedRegistryAddress, base, quote);
    }
    async getHistoricalPriceFromAggregator(aggregatorAddress, aggregatorRoundId) {
        return (0, priceFeeds_1.getHistoricalPriceFromAggregator)(this.env, aggregatorAddress, aggregatorRoundId);
    }
    // DEPRECATED
    // public async getRoundTimestampOfAggregator(
    //   aggregatorAddress: string,
    //   aggregatorRoundId: BigNumber
    // ): Promise<BigNumber> {
    //   return getRoundTimestampOfAggregator(
    //     this.env,
    //     aggregatorAddress,
    //     aggregatorRoundId
    //   );
    // }
    // DEPRECATED
    // public async getLatestTimestampOfAggregator(
    //   aggregatorAddress: string
    // ): Promise<BigNumber> {
    //   return getLatestTimestampOfAggregator(this.env, aggregatorAddress);
    // }
    // DEPRECATED
    // public async getLatestRoundIdOfAggregator(
    //   aggregatorAddress: string
    // ): Promise<BigNumber> {
    //   return getLatestRoundIdOfAggregator(this.env, aggregatorAddress);
    // }
    async getTypeAndVersionOfAggregator(aggregatorAddress) {
        return (0, priceFeeds_1.getTypeAndVersionOfAggregator)(this.env, aggregatorAddress);
    }
    async getPhaseIdOfAggregator(aggregatorAddress) {
        return (0, priceFeeds_1.getPhaseIdOfAggregator)(this.env, aggregatorAddress);
    }
    async isLayer2SequencerUp(sequencerUptimeFeedAddress) {
        return (0, priceFeeds_1.isLayer2SequencerUp)(this.env, sequencerUptimeFeedAddress);
    }
    async getTimeSinceLayer2SequencerIsUp(sequencerUptimeFeedAddress, gracePeriodTime = ethers_1.BigNumber.from(3600)) {
        return (0, priceFeeds_1.getTimeSinceLayer2SequencerIsUp)(this.env, sequencerUptimeFeedAddress, gracePeriodTime);
    }
    async createVrfSubscription(vrfCoordinatorAddress, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.createVrfSubscription)(this.env, vrfCoordinatorAddress, waitNumberOfConfirmations);
    }
    async fundVrfSubscription(vrfCoordinatorAddress, linkTokenAddress, amountInJuels, subscriptionId, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.fundVrfSubscription)(this.env, vrfCoordinatorAddress, linkTokenAddress, amountInJuels, subscriptionId, waitNumberOfConfirmations);
    }
    async addVrfConsumer(vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.addVrfConsumer)(this.env, vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations);
    }
    async removeVrfConsumer(vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.removeVrfConsumer)(this.env, vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations);
    }
    async cancelVrfSubscription(vrfCoordinatorAddress, subscriptionId, receivingWallet, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.cancelVrfSubscription)(this.env, vrfCoordinatorAddress, subscriptionId, receivingWallet, waitNumberOfConfirmations);
    }
    async getVrfSubscriptionDetails(vrfCoordinatorAddress, subscriptionId) {
        return (0, vrf_1.getVrfSubscriptionDetails)(this.env, vrfCoordinatorAddress, subscriptionId);
    }
    async pendingVrfRequestExists(vrfCoordinatorAddress, subscriptionId) {
        return (0, vrf_1.pendingVrfRequestExists)(this.env, vrfCoordinatorAddress, subscriptionId);
    }
    async requestVrfSubscriptionOwnerTransfer(vrfCoordinatorAddress, subscriptionId, newOwnerAddress, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.requestVrfSubscriptionOwnerTransfer)(this.env, vrfCoordinatorAddress, subscriptionId, newOwnerAddress, waitNumberOfConfirmations);
    }
    async acceptVrfSubscriptionOwnerTransfer(vrfCoordinatorAddress, subscriptionId, waitNumberOfConfirmations = 1) {
        return (0, vrf_1.acceptVrfSubscriptionOwnerTransfer)(this.env, vrfCoordinatorAddress, subscriptionId, waitNumberOfConfirmations);
    }
    async getMaxVrfConsumers(vrfCoordinatorAddress) {
        return (0, vrf_1.getMaxVrfConsumers)(this.env, vrfCoordinatorAddress);
    }
    async getMaxVrfNumberOfWords(vrfCoordinatorAddress) {
        return (0, vrf_1.getMaxVrfNumberOfWords)(this.env, vrfCoordinatorAddress);
    }
    async getMaxVrfRequestConfirmations(vrfCoordinatorAddress) {
        return (0, vrf_1.getMaxVrfRequestConfirmations)(this.env, vrfCoordinatorAddress);
    }
    async getMinVrfRequestConfirmations(vrfCoordinatorAddress) {
        return (0, vrf_1.getMinVrfRequestConfirmations)(this.env, vrfCoordinatorAddress);
    }
    async getMaxVrfRequestGasLimit(vrfCoordinatorAddress) {
        return (0, vrf_1.getMaxVrfRequestGasLimit)(this.env, vrfCoordinatorAddress);
    }
    async getVrfCommitment(vrfCoordinatorAddress, requestId) {
        return (0, vrf_1.getVrfCommitment)(this.env, vrfCoordinatorAddress, requestId);
    }
    async getVrfCoordinatorConfig(vrfCoordinatorAddress) {
        return (0, vrf_1.getVrfCoordinatorConfig)(this.env, vrfCoordinatorAddress);
    }
    async getVrfCoordinatorTypeAndVersion(vrfCoordinatorAddress) {
        return (0, vrf_1.getVrfCoordinatorTypeAndVersion)(this.env, vrfCoordinatorAddress);
    }
    async registerUpkeep(linkTokenAddress, automationRegistrarAddress, amountInJuels, name, encryptedEmail, upkeepContract, gasLimit, adminAddress, checkData, source, sender, waitNumberOfConfirmations = 1) {
        return (0, automation_1.registerUpkeep)(this.env, linkTokenAddress, automationRegistrarAddress, amountInJuels, name, encryptedEmail, upkeepContract, gasLimit, adminAddress, checkData, source, sender, waitNumberOfConfirmations);
    }
    async getAutomationPendingRegistrationRequest(automationRegistrarAddress, hash) {
        return (0, automation_1.getKeepersPendingRegistrationRequest)(this.env, automationRegistrarAddress, hash);
    }
    async cancelAutomationPendingRegistrationRequest(automationRegistrarAddress, hash, waitNumberOfConfirmations = 1) {
        return (0, automation_1.cancelKeepersPendingRegistrationRequest)(this.env, automationRegistrarAddress, hash, waitNumberOfConfirmations);
    }
    async getAutomationRegistrarConfig(automationRegistrarAddress) {
        return (0, automation_1.getKeepersRegistrarConfig)(this.env, automationRegistrarAddress);
    }
    async getAutomationRegistrarTypeAndVersion(automationRegistrarAddress) {
        return (0, automation_1.getKeepersRegistrarTypeAndVersion)(this.env, automationRegistrarAddress);
    }
    async fundUpkeep(automationRegistryAddress, id, amountInJuels, waitNumberOfConfirmations = 1) {
        return (0, automation_1.fundUpkeep)(this.env, automationRegistryAddress, id, amountInJuels, waitNumberOfConfirmations);
    }
    async checkUpkeep(automationRegistryAddress, id, address) {
        return (0, automation_1.checkUpkeep)(this.env, automationRegistryAddress, id, address);
    }
    async migrateUpkeeps(automationRegistryAddress, ids, destination, waitNumberOfConfirmations = 1) {
        return (0, automation_1.migrateUpkeeps)(this.env, automationRegistryAddress, ids, destination, waitNumberOfConfirmations);
    }
    async receiveMigratedUpkeeps(automationRegistryAddress, encodedUpkeeps, waitNumberOfConfirmations = 1) {
        return (0, automation_1.receiveMigratedUpkeeps)(this.env, automationRegistryAddress, encodedUpkeeps, waitNumberOfConfirmations);
    }
    async cancelUpkeep(automationRegistryAddress, id, waitNumberOfConfirmations = 1) {
        return (0, automation_1.cancelUpkeep)(this.env, automationRegistryAddress, id, waitNumberOfConfirmations);
    }
    async withdrawFundsFromCanceledUpkeep(automationRegistryAddress, id, to, waitNumberOfConfirmations = 1) {
        return (0, automation_1.withdrawFundsFromCanceledUpkeep)(this.env, automationRegistryAddress, id, to, waitNumberOfConfirmations);
    }
    async transferAutomationPayeeship(automationRegistryAddress, automationNode, proposed, waitNumberOfConfirmations = 1) {
        return (0, automation_1.transferKeeperPayeeship)(this.env, automationRegistryAddress, automationNode, proposed, waitNumberOfConfirmations);
    }
    async acceptAutomationPayeeship(automationRegistryAddress, automationNode, waitNumberOfConfirmations = 1) {
        return (0, automation_1.acceptKeeperPayeeship)(this.env, automationRegistryAddress, automationNode, waitNumberOfConfirmations);
    }
    async withdrawAutomationPayment(automationRegistryAddress, from, to, waitNumberOfConfirmations = 1) {
        return (0, automation_1.withdrawKeeperPayment)(this.env, automationRegistryAddress, from, to, waitNumberOfConfirmations);
    }
    async getActiveUpkeepIDs(automationRegistryAddress, startIndex, maxCount) {
        return (0, automation_1.getActiveUpkeepIDs)(this.env, automationRegistryAddress, startIndex, maxCount);
    }
    async getUpkeep(automationRegistryAddress, id) {
        return (0, automation_1.getUpkeep)(this.env, automationRegistryAddress, id);
    }
    async getAutomationNodeInfo(automationRegistryAddress, query) {
        return (0, automation_1.getKeeperInfo)(this.env, automationRegistryAddress, query);
    }
    async automationGetMaxPaymentForGas(automationRegistryAddress, gasLimit) {
        return (0, automation_1.keepersGetMaxPaymentForGas)(this.env, automationRegistryAddress, gasLimit);
    }
    async getMinBalanceForUpkeep(automationRegistryAddress, id) {
        return (0, automation_1.getMinBalanceForUpkeep)(this.env, automationRegistryAddress, id);
    }
    async getAutomationRegistryState(automationRegistryAddress) {
        return (0, automation_1.getKeepersRegistryState)(this.env, automationRegistryAddress);
    }
    async isAutomationRegistryPaused(automationRegistryAddress) {
        return (0, automation_1.isKeepersRegistryPaused)(this.env, automationRegistryAddress);
    }
    async getAutomationRegistryTypeAndVersion(automationRegistryAddress) {
        return (0, automation_1.getKeepersRegistryTypeAndVersion)(this.env, automationRegistryAddress);
    }
    async getAutomationRegistryUpkeepTranscoderVersion(automationRegistryAddress) {
        return (0, automation_1.getKeepersRegistryUpkeepTranscoderVersion)(this.env, automationRegistryAddress);
    }
    // --- Functions ---
    async functionsGetSubscriptionInfo(registryAddress, subscriptionId) {
        return (0, functions_1.getSubscriptionInfo)(this.env, registryAddress, subscriptionId);
    }
    async functionsFundSubscription(registryAddress, subscriptionId, linkAmount) {
        return (0, functions_1.fundSubscription)(this.env, registryAddress, subscriptionId, linkAmount);
    }
    async functionsCancelSubscription(registryAddress, subscriptionId, refundAddress) {
        return (0, functions_1.cancelSubscription)(this.env, registryAddress, subscriptionId, refundAddress);
    }
    async functionsAddSubscriptionConsumer(registryAddress, subscriptionId, consumerAddress) {
        return (0, functions_1.addSubscriptionConsumer)(this.env, registryAddress, subscriptionId, consumerAddress);
    }
}
exports.HardhatChainlink = HardhatChainlink;
//# sourceMappingURL=HardhatChainlink.js.map