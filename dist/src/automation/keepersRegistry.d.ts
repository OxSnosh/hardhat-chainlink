import { BigNumber, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const fundUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber, amountInJuels: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const checkUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber, address: string) => Promise<{
    performData: BytesLike;
    maxLinkPayment: BigNumber;
    gasLimit: BigNumber;
    adjustedGasWei: BigNumber;
    linkEth: BigNumber;
}>;
export declare const migrateUpkeeps: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, ids: BigNumber[], destination: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const receiveMigratedUpkeeps: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, encodedUpkeeps: BytesLike, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const cancelUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const withdrawFundsFromCanceledUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber, to: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const transferKeeperPayeeship: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, keeper: string, proposed: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const acceptKeeperPayeeship: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, keeper: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const withdrawKeeperPayment: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, from: string, to: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const getActiveUpkeepIDs: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, startIndex: BigNumber, maxCount: BigNumber) => Promise<BigNumber[]>;
export declare const getUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber) => Promise<{
    target: string;
    executeGas: number;
    checkData: BytesLike;
    balance: BigNumber;
    lastAutomationNode: string;
    admin: string;
    maxValidBlocknumber: BigNumber;
    amountSpent: BigNumber;
}>;
export declare const getKeeperInfo: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, query: string) => Promise<{
    payee: string;
    active: boolean;
    balance: BigNumber;
}>;
export declare const keepersGetMaxPaymentForGas: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, gasLimit: BigNumber) => Promise<BigNumber>;
export declare const getMinBalanceForUpkeep: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string, id: BigNumber) => Promise<BigNumber>;
export declare const getKeepersRegistryState: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string) => Promise<{
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
export declare const isKeepersRegistryPaused: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string) => Promise<boolean>;
export declare const getKeepersRegistryTypeAndVersion: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string) => Promise<string>;
export declare const getKeepersRegistryUpkeepTranscoderVersion: (env: HardhatRuntimeEnvironment, keepersRegistryAddress: string) => Promise<number>;
//# sourceMappingURL=keepersRegistry.d.ts.map