import { BigNumber } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const getSubscriptionInfo: (hre: HardhatRuntimeEnvironment, registryAddress: string, subscriptionId: number) => Promise<{
    balance: BigNumber;
    owner: string;
    consumers: string[];
}>;
export declare const fundSubscription: (hre: HardhatRuntimeEnvironment, registryAddress: string, subscriptionId: number, linkAmount: string) => Promise<BigNumber>;
export declare const addSubscriptionConsumer: (hre: HardhatRuntimeEnvironment, registryAddress: string, subscriptionId: number, consumerAddress: string) => Promise<void>;
export declare const cancelSubscription: (hre: HardhatRuntimeEnvironment, registryAddress: string, subscriptionId: number, refundAddress: string) => Promise<void>;
//# sourceMappingURL=billingRegistry.d.ts.map