import { BigNumber, BytesLike } from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
export declare const registerUpkeep: (env: HardhatRuntimeEnvironment, linkTokenAddress: string, keepersRegistrarAddress: string, amountInJuels: BigNumber, name: string, encryptedEmail: BytesLike, upkeepContract: string, gasLimit: number, adminAddress: string, checkData: BytesLike, source: number, sender: string, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const getKeepersPendingRegistrationRequest: (env: HardhatRuntimeEnvironment, keepersRegistrarAddress: string, hash: BytesLike) => Promise<{
    adminAddress: string;
    balance: BigNumber;
}>;
export declare const cancelKeepersPendingRegistrationRequest: (env: HardhatRuntimeEnvironment, keepersRegistrarAddress: string, hash: BytesLike, waitNumberOfConfirmations: number) => Promise<{
    transactionHash: string;
}>;
export declare const getKeepersRegistrarConfig: (env: HardhatRuntimeEnvironment, keepersRegistrarAddress: string) => Promise<{
    autoApproveConfigType: number;
    autoApproveMaxAllowed: number;
    approvedCount: number;
    automationRegistry: string;
    minLINKJuels: BigNumber;
}>;
export declare const getKeepersRegistrarTypeAndVersion: (env: HardhatRuntimeEnvironment, keepersRegistrarAddress: string) => Promise<string>;
//# sourceMappingURL=keepersRegistrar.d.ts.map