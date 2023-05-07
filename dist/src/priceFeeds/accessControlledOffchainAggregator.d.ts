import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const getHistoricalPriceFromAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string, aggregatorRoundId: BigNumber) => Promise<BigNumber>;
export declare const getRoundTimestampOfAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string, aggregatorRoundId: BigNumber) => Promise<BigNumber>;
export declare const getLatestTimestampOfAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string) => Promise<BigNumber>;
export declare const getLatestRoundIdOfAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string) => Promise<BigNumber>;
export declare const getTypeAndVersionOfAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string) => Promise<string>;
export declare const getPhaseIdOfAggregator: (env: HardhatRuntimeEnvironment, aggregatorAddress: string) => Promise<BigNumber>;
//# sourceMappingURL=accessControlledOffchainAggregator.d.ts.map