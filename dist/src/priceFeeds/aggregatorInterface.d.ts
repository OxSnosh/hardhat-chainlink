import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const getLatestPrice: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<BigNumber>;
export declare const getLatestRoundData: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
}>;
export declare const getPriceFeedDecimals: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<number>;
export declare const getPriceFeedDescription: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<string>;
export declare const getRoundData: (env: HardhatRuntimeEnvironment, priceFeedAddress: string, roundId: BigNumber) => Promise<{
    roundId: BigNumber;
    answer: BigNumber;
    startedAt: BigNumber;
    updatedAt: BigNumber;
    answeredInRound: BigNumber;
}>;
export declare const getPriceFeedAggregatorVersion: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<BigNumber>;
export declare const getAggregatorAddress: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<string>;
export declare const getAggregatorRoundId: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<BigNumber>;
export declare const getPhaseId: (env: HardhatRuntimeEnvironment, priceFeedAddress: string) => Promise<BigNumber>;
export declare const getHistoricalPrice: (env: HardhatRuntimeEnvironment, priceFeedAddress: string, roundId: BigNumber) => Promise<BigNumber>;
//# sourceMappingURL=aggregatorInterface.d.ts.map