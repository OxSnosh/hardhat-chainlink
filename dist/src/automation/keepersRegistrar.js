"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeepersRegistrarTypeAndVersion = exports.getKeepersRegistrarConfig = exports.cancelKeepersPendingRegistrationRequest = exports.getKeepersPendingRegistrationRequest = exports.registerUpkeep = void 0;
const KeeperRegistrar_json_1 = __importDefault(require("@chainlink/contracts/abi/v0.8/KeeperRegistrar.json"));
const utils_1 = require("ethers/lib/utils");
const types_1 = require("../../types");
const registerUpkeep = async (env, linkTokenAddress, keepersRegistrarAddress, amountInJuels, name, encryptedEmail, upkeepContract, gasLimit, adminAddress, checkData, source, sender, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const linkToken = types_1.LinkTokenInterface__factory.connect(linkTokenAddress, signer);
    const solidityRegisterFunctionSignature = `register`;
    const KeeperRegistrarInterface = new utils_1.Interface(KeeperRegistrar_json_1.default);
    const functionSelector = KeeperRegistrarInterface.getSighash(solidityRegisterFunctionSignature);
    const tx = await linkToken.transferAndCall(keepersRegistrarAddress, amountInJuels, utils_1.defaultAbiCoder.encode([
        "bytes4",
        "string",
        "bytes",
        "address",
        "uint32",
        "address",
        "bytes",
        "uint96",
        "uint8",
        "address",
    ], [
        functionSelector,
        name,
        encryptedEmail,
        upkeepContract,
        gasLimit,
        adminAddress,
        checkData,
        amountInJuels,
        source,
        sender,
    ]));
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.registerUpkeep = registerUpkeep;
const getKeepersPendingRegistrationRequest = async (env, keepersRegistrarAddress, hash) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistrar = types_1.KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);
    const pendingRequest = await keepersRegistrar.getPendingRequest(hash);
    return { adminAddress: pendingRequest[0], balance: pendingRequest[1] };
};
exports.getKeepersPendingRegistrationRequest = getKeepersPendingRegistrationRequest;
const cancelKeepersPendingRegistrationRequest = async (env, keepersRegistrarAddress, hash, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistrar = types_1.KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);
    const tx = await keepersRegistrar.cancel(hash);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.cancelKeepersPendingRegistrationRequest = cancelKeepersPendingRegistrationRequest;
const getKeepersRegistrarConfig = async (env, keepersRegistrarAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistrar = types_1.KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);
    const config = await keepersRegistrar.getRegistrationConfig();
    return {
        autoApproveConfigType: config.autoApproveConfigType,
        autoApproveMaxAllowed: config.autoApproveMaxAllowed,
        approvedCount: config.approvedCount,
        automationRegistry: config.keeperRegistry,
        minLINKJuels: config.minLINKJuels,
    };
};
exports.getKeepersRegistrarConfig = getKeepersRegistrarConfig;
const getKeepersRegistrarTypeAndVersion = async (env, keepersRegistrarAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistrar = types_1.KeeperRegistrar__factory.connect(keepersRegistrarAddress, signer);
    return keepersRegistrar.typeAndVersion();
};
exports.getKeepersRegistrarTypeAndVersion = getKeepersRegistrarTypeAndVersion;
//# sourceMappingURL=keepersRegistrar.js.map