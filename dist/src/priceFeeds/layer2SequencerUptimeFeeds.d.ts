import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const isLayer2SequencerUp: (env: HardhatRuntimeEnvironment, sequencerUptimeFeedAddress: string) => Promise<boolean>;
export declare const getTimeSinceLayer2SequencerIsUp: (env: HardhatRuntimeEnvironment, sequencerUptimeFeedAddress: string, gracePeriodTime?: BigNumber) => Promise<{
    isSequencerUp: boolean;
    timeSinceUp: BigNumber;
    isGracePeriodOver: boolean;
}>;
//# sourceMappingURL=layer2SequencerUptimeFeeds.d.ts.map