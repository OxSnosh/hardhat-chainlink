"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeepersRegistryUpkeepTranscoderVersion = exports.getKeepersRegistryTypeAndVersion = exports.isKeepersRegistryPaused = exports.getKeepersRegistryState = exports.getMinBalanceForUpkeep = exports.keepersGetMaxPaymentForGas = exports.getKeeperInfo = exports.getUpkeep = exports.getActiveUpkeepIDs = exports.withdrawKeeperPayment = exports.acceptKeeperPayeeship = exports.transferKeeperPayeeship = exports.withdrawFundsFromCanceledUpkeep = exports.cancelUpkeep = exports.receiveMigratedUpkeeps = exports.migrateUpkeeps = exports.checkUpkeep = exports.fundUpkeep = void 0;
const types_1 = require("../../types");
const fundUpkeep = async (env, keepersRegistryAddress, id, amountInJuels, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.addFunds(id, amountInJuels);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.fundUpkeep = fundUpkeep;
const checkUpkeep = async (env, keepersRegistryAddress, id, address) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const simulatedResponse = await keepersRegistry.callStatic.checkUpkeep(id, address);
    return {
        performData: simulatedResponse.performData,
        maxLinkPayment: simulatedResponse.maxLinkPayment,
        gasLimit: simulatedResponse.gasLimit,
        adjustedGasWei: simulatedResponse.adjustedGasWei,
        linkEth: simulatedResponse.linkEth,
    };
};
exports.checkUpkeep = checkUpkeep;
const migrateUpkeeps = async (env, keepersRegistryAddress, ids, destination, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.migrateUpkeeps(ids, destination);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.migrateUpkeeps = migrateUpkeeps;
const receiveMigratedUpkeeps = async (env, keepersRegistryAddress, encodedUpkeeps, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.receiveUpkeeps(encodedUpkeeps);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.receiveMigratedUpkeeps = receiveMigratedUpkeeps;
const cancelUpkeep = async (env, keepersRegistryAddress, id, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.cancelUpkeep(id);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.cancelUpkeep = cancelUpkeep;
const withdrawFundsFromCanceledUpkeep = async (env, keepersRegistryAddress, id, to, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.withdrawFunds(id, to);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.withdrawFundsFromCanceledUpkeep = withdrawFundsFromCanceledUpkeep;
const transferKeeperPayeeship = async (env, keepersRegistryAddress, keeper, proposed, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.transferPayeeship(keeper, proposed);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.transferKeeperPayeeship = transferKeeperPayeeship;
const acceptKeeperPayeeship = async (env, keepersRegistryAddress, keeper, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.acceptPayeeship(keeper);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.acceptKeeperPayeeship = acceptKeeperPayeeship;
const withdrawKeeperPayment = async (env, keepersRegistryAddress, from, to, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const tx = await keepersRegistry.withdrawPayment(from, to);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.withdrawKeeperPayment = withdrawKeeperPayment;
const getActiveUpkeepIDs = async (env, keepersRegistryAddress, startIndex, maxCount) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.getActiveUpkeepIDs(startIndex, maxCount);
};
exports.getActiveUpkeepIDs = getActiveUpkeepIDs;
const getUpkeep = async (env, keepersRegistryAddress, id) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const upkeep = await keepersRegistry.getUpkeep(id);
    return {
        target: upkeep.target,
        executeGas: upkeep.executeGas,
        checkData: upkeep.checkData,
        balance: upkeep.balance,
        lastAutomationNode: upkeep.lastKeeper,
        admin: upkeep.admin,
        maxValidBlocknumber: upkeep.maxValidBlocknumber,
        amountSpent: upkeep.amountSpent,
    };
};
exports.getUpkeep = getUpkeep;
const getKeeperInfo = async (env, keepersRegistryAddress, query) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const keeper = await keepersRegistry.getKeeperInfo(query);
    return {
        payee: keeper.payee,
        active: keeper.active,
        balance: keeper.balance,
    };
};
exports.getKeeperInfo = getKeeperInfo;
const keepersGetMaxPaymentForGas = async (env, keepersRegistryAddress, gasLimit) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.getMaxPaymentForGas(gasLimit);
};
exports.keepersGetMaxPaymentForGas = keepersGetMaxPaymentForGas;
const getMinBalanceForUpkeep = async (env, keepersRegistryAddress, id) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.getMinBalanceForUpkeep(id);
};
exports.getMinBalanceForUpkeep = getMinBalanceForUpkeep;
const getKeepersRegistryState = async (env, keepersRegistryAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    const store = await keepersRegistry.getState();
    return {
        nonce: store.state.nonce,
        ownerLinkBalance: store.state.ownerLinkBalance,
        expectedLinkBalance: store.state.expectedLinkBalance,
        numUpkeeps: store.state.numUpkeeps,
        paymentPremiumPPB: store.config.paymentPremiumPPB,
        flatFeeMicroLink: store.config.flatFeeMicroLink,
        blockCountPerTurn: store.config.blockCountPerTurn,
        checkGasLimit: store.config.checkGasLimit,
        stalenessSeconds: store.config.stalenessSeconds,
        gasCeilingMultiplier: store.config.gasCeilingMultiplier,
        minUpkeepSpend: store.config.minUpkeepSpend,
        maxPerformGas: store.config.maxPerformGas,
        fallbackGasPrice: store.config.fallbackGasPrice,
        fallbackLinkPrice: store.config.fallbackLinkPrice,
        transcoder: store.config.transcoder,
        registrar: store.config.registrar,
        automationNodes: store.keepers,
    };
};
exports.getKeepersRegistryState = getKeepersRegistryState;
const isKeepersRegistryPaused = async (env, keepersRegistryAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.paused();
};
exports.isKeepersRegistryPaused = isKeepersRegistryPaused;
const getKeepersRegistryTypeAndVersion = async (env, keepersRegistryAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.typeAndVersion();
};
exports.getKeepersRegistryTypeAndVersion = getKeepersRegistryTypeAndVersion;
const getKeepersRegistryUpkeepTranscoderVersion = async (env, keepersRegistryAddress) => {
    const [signer] = await env.ethers.getSigners();
    const keepersRegistry = types_1.KeeperRegistry1_3__factory.connect(keepersRegistryAddress, signer);
    return keepersRegistry.upkeepTranscoderVersion();
};
exports.getKeepersRegistryUpkeepTranscoderVersion = getKeepersRegistryUpkeepTranscoderVersion;
//# sourceMappingURL=keepersRegistry.js.map