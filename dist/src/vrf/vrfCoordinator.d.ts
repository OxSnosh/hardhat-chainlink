import { BigNumber } from "ethers";
import { BytesLike } from "ethers/lib/utils";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const createVrfSubscription: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, waitNumberOfConfirmations: number) => Promise<{
    subscriptionId: BigNumber;
    transactionHash: string;
}>;
export declare const fundVrfSubscription: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, linkTokenAddress: string, amountInJuels: BigNumber, subscriptionId: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const addVrfConsumer: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const removeVrfConsumer: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, consumerAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const cancelVrfSubscription: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, subscriptionId: BigNumber, receivingWallet: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const getVrfSubscriptionDetails: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, subscriptionId: BigNumber) => Promise<{
    balance: BigNumber;
    reqCount: BigNumber;
    owner: string;
    consumers: string[];
}>;
export declare const pendingVrfRequestExists: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, subscriptionId: BigNumber) => Promise<boolean>;
export declare const requestVrfSubscriptionOwnerTransfer: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, subscriptionId: BigNumber, newOwnerAddress: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const acceptVrfSubscriptionOwnerTransfer: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, subscriptionId: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const getMaxVrfConsumers: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<number>;
export declare const getMaxVrfNumberOfWords: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<number>;
export declare const getMaxVrfRequestConfirmations: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<number>;
export declare const getMinVrfRequestConfirmations: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<number>;
export declare const getMaxVrfRequestGasLimit: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<number>;
export declare const getVrfCommitment: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string, requestId: BigNumber) => Promise<BytesLike>;
export declare const getVrfCoordinatorConfig: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<{
    minimumRequestConfirmations: number;
    maxGasLimit: number;
    stalenessSeconds: number;
    gasAfterPaymentCalculation: number;
}>;
export declare const getVrfCoordinatorTypeAndVersion: (env: HardhatRuntimeEnvironment, vrfCoordinatorAddress: string) => Promise<string>;
//# sourceMappingURL=vrfCoordinator.d.ts.map