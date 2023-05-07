"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVrfCoordinatorTypeAndVersion = exports.getVrfCoordinatorConfig = exports.getVrfCommitment = exports.getMaxVrfRequestGasLimit = exports.getMinVrfRequestConfirmations = exports.getMaxVrfRequestConfirmations = exports.getMaxVrfNumberOfWords = exports.getMaxVrfConsumers = exports.acceptVrfSubscriptionOwnerTransfer = exports.requestVrfSubscriptionOwnerTransfer = exports.pendingVrfRequestExists = exports.getVrfSubscriptionDetails = exports.cancelVrfSubscription = exports.removeVrfConsumer = exports.addVrfConsumer = exports.fundVrfSubscription = exports.createVrfSubscription = void 0;
const ethers_1 = require("ethers");
const utils_1 = require("ethers/lib/utils");
const types_1 = require("../../types");
const createVrfSubscription = async (env, vrfCoordinatorAddress, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.createSubscription();
    const txReceipt = await tx.wait(waitNumberOfConfirmations);
    if (!txReceipt.events) {
        throw new Error("Error Creating New Subscription");
    }
    const subscriptionId = ethers_1.BigNumber.from(txReceipt.events[0].topics[1]);
    return { subscriptionId, transactionHash: tx.hash };
};
exports.createVrfSubscription = createVrfSubscription;
const fundVrfSubscription = async (env, vrfCoordinatorAddress, linkTokenAddress, amountInJuels, subscriptionId, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const linkToken = types_1.LinkTokenInterface__factory.connect(linkTokenAddress, signer);
    const tx = await linkToken.transferAndCall(vrfCoordinatorAddress, amountInJuels, utils_1.defaultAbiCoder.encode(["uint64"], [subscriptionId]));
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.fundVrfSubscription = fundVrfSubscription;
const addVrfConsumer = async (env, vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.addConsumer(subscriptionId, consumerAddress);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.addVrfConsumer = addVrfConsumer;
const removeVrfConsumer = async (env, vrfCoordinatorAddress, consumerAddress, subscriptionId, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.removeConsumer(subscriptionId, consumerAddress);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.removeVrfConsumer = removeVrfConsumer;
const cancelVrfSubscription = async (env, vrfCoordinatorAddress, subscriptionId, receivingWallet, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.cancelSubscription(subscriptionId, receivingWallet);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.cancelVrfSubscription = cancelVrfSubscription;
const getVrfSubscriptionDetails = async (env, vrfCoordinatorAddress, subscriptionId) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const callback = await vrfCoordinatorV2.getSubscription(subscriptionId);
    return {
        balance: callback.balance,
        reqCount: callback.reqCount,
        owner: callback.owner,
        consumers: callback.consumers,
    };
};
exports.getVrfSubscriptionDetails = getVrfSubscriptionDetails;
const pendingVrfRequestExists = async (env, vrfCoordinatorAddress, subscriptionId) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    return vrfCoordinatorV2.pendingRequestExists(subscriptionId);
};
exports.pendingVrfRequestExists = pendingVrfRequestExists;
const requestVrfSubscriptionOwnerTransfer = async (env, vrfCoordinatorAddress, subscriptionId, newOwnerAddress, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.requestSubscriptionOwnerTransfer(subscriptionId, newOwnerAddress);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.requestVrfSubscriptionOwnerTransfer = requestVrfSubscriptionOwnerTransfer;
const acceptVrfSubscriptionOwnerTransfer = async (env, vrfCoordinatorAddress, subscriptionId, waitNumberOfConfirmations) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const tx = await vrfCoordinatorV2.acceptSubscriptionOwnerTransfer(subscriptionId);
    await tx.wait(waitNumberOfConfirmations);
    return { transactionHash: tx.hash };
};
exports.acceptVrfSubscriptionOwnerTransfer = acceptVrfSubscriptionOwnerTransfer;
const getMaxVrfConsumers = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const maxConsumers = await vrfCoordinatorV2.MAX_CONSUMERS();
    return maxConsumers;
};
exports.getMaxVrfConsumers = getMaxVrfConsumers;
const getMaxVrfNumberOfWords = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const maxNumWords = await vrfCoordinatorV2.MAX_NUM_WORDS();
    return maxNumWords;
};
exports.getMaxVrfNumberOfWords = getMaxVrfNumberOfWords;
const getMaxVrfRequestConfirmations = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const maxRequestConfirmations = await vrfCoordinatorV2.MAX_REQUEST_CONFIRMATIONS();
    return maxRequestConfirmations;
};
exports.getMaxVrfRequestConfirmations = getMaxVrfRequestConfirmations;
const getMinVrfRequestConfirmations = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const requestConfig = await vrfCoordinatorV2.getRequestConfig();
    return requestConfig[0];
};
exports.getMinVrfRequestConfirmations = getMinVrfRequestConfirmations;
const getMaxVrfRequestGasLimit = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const requestConfig = await vrfCoordinatorV2.getRequestConfig();
    return requestConfig[1];
};
exports.getMaxVrfRequestGasLimit = getMaxVrfRequestGasLimit;
const getVrfCommitment = async (env, vrfCoordinatorAddress, requestId) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const commitment = await vrfCoordinatorV2.getCommitment(requestId);
    return commitment;
};
exports.getVrfCommitment = getVrfCommitment;
const getVrfCoordinatorConfig = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const config = await vrfCoordinatorV2.getConfig();
    return {
        minimumRequestConfirmations: config.minimumRequestConfirmations,
        maxGasLimit: config.maxGasLimit,
        stalenessSeconds: config.stalenessSeconds,
        gasAfterPaymentCalculation: config.gasAfterPaymentCalculation,
    };
};
exports.getVrfCoordinatorConfig = getVrfCoordinatorConfig;
const getVrfCoordinatorTypeAndVersion = async (env, vrfCoordinatorAddress) => {
    const [signer] = await env.ethers.getSigners();
    const vrfCoordinatorV2 = types_1.VRFCoordinatorV2__factory.connect(vrfCoordinatorAddress, signer);
    const typeAndVersion = await vrfCoordinatorV2.typeAndVersion();
    return typeAndVersion;
};
exports.getVrfCoordinatorTypeAndVersion = getVrfCoordinatorTypeAndVersion;
//# sourceMappingURL=vrfCoordinator.js.map