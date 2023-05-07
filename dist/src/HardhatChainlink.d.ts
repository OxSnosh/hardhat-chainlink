import "@nomiclabs/hardhat-ethers";
import { BigNumber, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare class HardhatChainlink {
    denominations: Readonly<{
        ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        BTC: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB";
        USD: "0x0000000000000000000000000000000000000348";
        GBP: "0x000000000000000000000000000000000000033a";
        EUR: "0x00000000000000000000000000000000000003d2";
        JPY: "0x0000000000000000000000000000000000000188";
        KRW: "0x000000000000000000000000000000000000019a";
        CNY: "0x000000000000000000000000000000000000009c";
        AUD: "0x0000000000000000000000000000000000000024";
        CAD: "0x000000000000000000000000000000000000007c";
        CHF: "0x00000000000000000000000000000000000002F4";
        ARS: "0x0000000000000000000000000000000000000020";
        PHP: "0x0000000000000000000000000000000000000260";
        NZD: "0x000000000000000000000000000000000000022A";
        SGD: "0x00000000000000000000000000000000000002be";
        NGN: "0x0000000000000000000000000000000000000236";
        ZAR: "0x00000000000000000000000000000000000002c6";
        RUB: "0x0000000000000000000000000000000000000283";
        INR: "0x0000000000000000000000000000000000000164";
        BRL: "0x00000000000000000000000000000000000003Da";
    }>;
    private env;
    constructor(env: HardhatRuntimeEnvironment);
    getLatestPrice(priceFeedAddress: string): Promise<BigNumber>;
    getLatestRoundData(dataFeedAddress: string): Promise<{
        roundId: BigNumber;
        answer: BigNumber;
        startedAt: BigNumber;
        updatedAt: BigNumber;
        answeredInRound: BigNumber;
    }>;
    getPriceFeedDecimals(priceFeedAddress: string): Promise<number>;
    getPriceFeedDescription(priceFeedAddress: string): Promise<string>;
    getRoundData(priceFeedAddress: string, roundId: BigNumber): Promise<{
        roundId: BigNumber;
        answer: BigNumber;
        startedAt: BigNumber;
        updatedAt: BigNumber;
        answeredInRound: BigNumber;
    }>;
    getAggregatorAddress(priceFeedAddress: string): Promise<string>;
    getAggregatorRoundId(priceFeedAddress: string): Promise<BigNumber>;
    getPhaseId(priceFeedAddress: string): Promise<BigNumber>;
    getHistoricalPrice(priceFeedAddress: string, roundId: BigNumber): Promise<BigNumber>;
    getPriceFeedAggregatorVersion(priceFeedAddress: string): Promise<BigNumber>;
    resolveEnsAggregatorAddress(baseTick: string, quoteTick: string): Promise<string>;
    resolveEnsAggregatorAddressWithSubdomains(baseTick: string, quoteTick: string): Promise<{
        proxy: string;
        underlyingAggregator: string;
        proposedAggregator: string;
    }>;
    getFeedRegistryDecimals(feedRegistryAddress: string, base: string, quote: string): Promise<number>;
    getFeedRegistryDescription(feedRegistryAddress: string, base: string, quote: string): Promise<string>;
    getFeedRegistryRoundData(feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber): Promise<{
        roundId: BigNumber;
        answer: BigNumber;
        startedAt: BigNumber;
        updatedAt: BigNumber;
        answeredInRound: BigNumber;
    }>;
    getFeedRegistryLatestRoundData(feedRegistryAddress: string, base: string, quote: string): Promise<{
        roundId: BigNumber;
        answer: BigNumber;
        startedAt: BigNumber;
        updatedAt: BigNumber;
        answeredInRound: BigNumber;
    }>;
    getFeedRegistryProxyAggregatorVersion(feedRegistryAddress: string, base: string, quote: string): Promise<BigNumber>;
    getFeed(feedRegistryAddress: string, base: string, quote: string): Promise<string>;
    getPhaseFeed(feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber): Promise<string>;
    isFeedEnabled(feedRegistryAddress: string, aggregatorAddress: string): Promise<boolean>;
    getPhase(feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber): Promise<{
        phaseId: number;
        startingAggregatorRoundId: BigNumber;
        endingAggregatorRoundId: BigNumber;
    }>;
    getRoundFeed(feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber): Promise<string>;
    getPhaseRange(feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber): Promise<{
        startingRoundId: BigNumber;
        endingRoundId: BigNumber;
    }>;
    getPreviousRoundId(feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber): Promise<BigNumber>;
    getNextRoundId(feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber): Promise<BigNumber>;
    getCurrentPhaseId(feedRegistryAddress: string, base: string, quote: string): Promise<number>;
    getHistoricalPriceFromAggregator(aggregatorAddress: string, aggregatorRoundId: BigNumber): Promise<BigNumber>;
    getTypeAndVersionOfAggregator(aggregatorAddress: string): Promise<string>;
    getPhaseIdOfAggregator(aggregatorAddress: string): Promise<BigNumber>;
    isLayer2SequencerUp(sequencerUptimeFeedAddress: string): Promise<boolean>;
    getTimeSinceLayer2SequencerIsUp(sequencerUptimeFeedAddress: string, gracePeriodTime?: BigNumber): Promise<{
        isSequencerUp: boolean;
        timeSinceUp: BigNumber;
        isGracePeriodOver: boolean;
    }>;
    createVrfSubscription(vrfCoordinatorAddress: string, waitNumberOfConfirmations?: number): Promise<{
        subscriptionId: BigNumber;
        transactionHash: string;
    }>;
    fundVrfSubscription(vrfCoordinatorAddress: string, linkTokenAddress: string, amountInJuels: BigNumber, subscriptionId: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    addVrfConsumer(vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    removeVrfConsumer(vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    cancelVrfSubscription(vrfCoordinatorAddress: string, subscriptionId: BigNumber, receivingWallet: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    getVrfSubscriptionDetails(vrfCoordinatorAddress: string, subscriptionId: BigNumber): Promise<{
        balance: BigNumber;
        reqCount: BigNumber;
        owner: string;
        consumers: string[];
    }>;
    pendingVrfRequestExists(vrfCoordinatorAddress: string, subscriptionId: BigNumber): Promise<boolean>;
    requestVrfSubscriptionOwnerTransfer(vrfCoordinatorAddress: string, subscriptionId: BigNumber, newOwnerAddress: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    acceptVrfSubscriptionOwnerTransfer(vrfCoordinatorAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    getMaxVrfConsumers(vrfCoordinatorAddress: string): Promise<number>;
    getMaxVrfNumberOfWords(vrfCoordinatorAddress: string): Promise<number>;
    getMaxVrfRequestConfirmations(vrfCoordinatorAddress: string): Promise<number>;
    getMinVrfRequestConfirmations(vrfCoordinatorAddress: string): Promise<number>;
    getMaxVrfRequestGasLimit(vrfCoordinatorAddress: string): Promise<number>;
    getVrfCommitment(vrfCoordinatorAddress: string, requestId: BigNumber): Promise<BytesLike>;
    getVrfCoordinatorConfig(vrfCoordinatorAddress: string): Promise<{
        minimumRequestConfirmations: number;
        maxGasLimit: number;
        stalenessSeconds: number;
        gasAfterPaymentCalculation: number;
    }>;
    getVrfCoordinatorTypeAndVersion(vrfCoordinatorAddress: string): Promise<string>;
    registerUpkeep(linkTokenAddress: string, automationRegistrarAddress: string, amountInJuels: BigNumber, name: string, encryptedEmail: BytesLike, upkeepContract: string, gasLimit: number, adminAddress: string, checkData: BytesLike, source: number, sender: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    getAutomationPendingRegistrationRequest(automationRegistrarAddress: string, hash: BytesLike): Promise<{
        adminAddress: string;
        balance: BigNumber;
    }>;
    cancelAutomationPendingRegistrationRequest(automationRegistrarAddress: string, hash: BytesLike, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    getAutomationRegistrarConfig(automationRegistrarAddress: string): Promise<{
        autoApproveConfigType: number;
        autoApproveMaxAllowed: number;
        approvedCount: number;
        automationRegistry: string;
        minLINKJuels: BigNumber;
    }>;
    getAutomationRegistrarTypeAndVersion(automationRegistrarAddress: string): Promise<string>;
    fundUpkeep(automationRegistryAddress: string, id: BigNumber, amountInJuels: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    checkUpkeep(automationRegistryAddress: string, id: BigNumber, address: string): Promise<{
        performData: BytesLike;
        maxLinkPayment: BigNumber;
        gasLimit: BigNumber;
        adjustedGasWei: BigNumber;
        linkEth: BigNumber;
    }>;
    migrateUpkeeps(automationRegistryAddress: string, ids: BigNumber[], destination: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    receiveMigratedUpkeeps(automationRegistryAddress: string, encodedUpkeeps: BytesLike, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    cancelUpkeep(automationRegistryAddress: string, id: BigNumber, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    withdrawFundsFromCanceledUpkeep(automationRegistryAddress: string, id: BigNumber, to: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    transferAutomationPayeeship(automationRegistryAddress: string, automationNode: string, proposed: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    acceptAutomationPayeeship(automationRegistryAddress: string, automationNode: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    withdrawAutomationPayment(automationRegistryAddress: string, from: string, to: string, waitNumberOfConfirmations?: number): Promise<{
        transactionHash: string;
    }>;
    getActiveUpkeepIDs(automationRegistryAddress: string, startIndex: BigNumber, maxCount: BigNumber): Promise<BigNumber[]>;
    getUpkeep(automationRegistryAddress: string, id: BigNumber): Promise<{
        target: string;
        executeGas: number;
        checkData: BytesLike;
        balance: BigNumber;
        lastAutomationNode: string;
        admin: string;
        maxValidBlocknumber: BigNumber;
        amountSpent: BigNumber;
    }>;
    getAutomationNodeInfo(automationRegistryAddress: string, query: string): Promise<{
        payee: string;
        active: boolean;
        balance: BigNumber;
    }>;
    automationGetMaxPaymentForGas(automationRegistryAddress: string, gasLimit: BigNumber): Promise<BigNumber>;
    getMinBalanceForUpkeep(automationRegistryAddress: string, id: BigNumber): Promise<BigNumber>;
    getAutomationRegistryState(automationRegistryAddress: string): Promise<{
        nonce: number;
        ownerLinkBalance: BigNumber;
        expectedLinkBalance: BigNumber;
        numUpkeeps: BigNumber;
        paymentPremiumPPB: number;
        flatFeeMicroLink: number;
        blockCountPerTurn: number;
        checkGasLimit: number;
        stalenessSeconds: number;
        gasCeilingMultiplier: number;
        minUpkeepSpend: BigNumber;
        maxPerformGas: number;
        fallbackGasPrice: BigNumber;
        fallbackLinkPrice: BigNumber;
        transcoder: string;
        registrar: string;
        automationNodes: string[];
    }>;
    isAutomationRegistryPaused(automationRegistryAddress: string): Promise<boolean>;
    getAutomationRegistryTypeAndVersion(automationRegistryAddress: string): Promise<string>;
    getAutomationRegistryUpkeepTranscoderVersion(automationRegistryAddress: string): Promise<number>;
    functionsGetSubscriptionInfo(registryAddress: string, subscriptionId: number): Promise<{
        balance: BigNumber;
        owner: string;
        consumers: string[];
    }>;
    functionsFundSubscription(registryAddress: string, subscriptionId: number, linkAmount: string): Promise<BigNumber>;
    functionsCancelSubscription(registryAddress: string, subscriptionId: number, refundAddress: string): Promise<void>;
    functionsAddSubscriptionConsumer(registryAddress: string, subscriptionId: number, consumerAddress: string): Promise<void>;
}
//# sourceMappingURL=HardhatChainlink.d.ts.map