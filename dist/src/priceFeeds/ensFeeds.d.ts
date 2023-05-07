import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const resolveEnsAggregatorAddress: (env: HardhatRuntimeEnvironment, baseTick: string, quoteTick: string) => Promise<string>;
export declare const resolveEnsAggregatorAddressWithSubdomains: (env: HardhatRuntimeEnvironment, baseTick: string, quoteTick: string) => Promise<{
    proxy: string;
    underlyingAggregator: string;
    proposedAggregator: string;
}>;
//# sourceMappingURL=ensFeeds.d.ts.map