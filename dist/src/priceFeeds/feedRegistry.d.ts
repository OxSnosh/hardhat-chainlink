import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const Denominations: Readonly<{
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
export declare const getFeedRegistryDecimals: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<number>;
export declare const getFeedRegistryDescription: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<string>;
export declare const getFeedRegistryRoundData: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber) => Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
}>;
export declare const getFeedRegistryLatestRoundData: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
}>;
export declare const getFeedRegistryProxyAggregatorVersion: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<BigNumber>;
export declare const getFeed: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<string>;
export declare const getPhaseFeed: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber) => Promise<string>;
export declare const isFeedEnabled: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, aggregatorAddress: string) => Promise<boolean>;
export declare const getPhase: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber) => Promise<{
    phaseId: number;
    startingAggregatorRoundId: BigNumber;
    endingAggregatorRoundId: BigNumber;
}>;
export declare const getRoundFeed: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber) => Promise<string>;
export declare const getPhaseRange: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, phaseId: BigNumber) => Promise<{
    startingRoundId: BigNumber;
    endingRoundId: BigNumber;
}>;
export declare const getPreviousRoundId: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber) => Promise<BigNumber>;
export declare const getNextRoundId: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string, roundId: BigNumber) => Promise<BigNumber>;
export declare const getCurrentPhaseId: (env: HardhatRuntimeEnvironment, feedRegistryAddress: string, base: string, quote: string) => Promise<number>;
//# sourceMappingURL=feedRegistry.d.ts.map