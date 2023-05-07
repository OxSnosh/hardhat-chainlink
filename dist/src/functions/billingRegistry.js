"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSubscription = exports.addSubscriptionConsumer = exports.fundSubscription = exports.getSubscriptionInfo = void 0;
const types_1 = require("../../types");
const addresses_1 = require("../addresses");
const getSubscriptionInfo = async (hre, registryAddress, subscriptionId) => {
    const [signer] = await hre.ethers.getSigners();
    const registry = types_1.FunctionsBillingRegistry__factory.connect(registryAddress, signer);
    return registry.getSubscription(subscriptionId);
};
exports.getSubscriptionInfo = getSubscriptionInfo;
const fundSubscription = async (hre, registryAddress, subscriptionId, linkAmount) => {
    const [signer] = await hre.ethers.getSigners();
    const juelsAmount = hre.ethers.utils.parseUnits(linkAmount);
    const linkTokenAddress = (0, addresses_1.getLinkTokenAddress)(hre.network.config.chainId);
    const linkToken = types_1.LinkTokenInterface__factory.connect(linkTokenAddress, signer);
    const balance = await linkToken.balanceOf(signer.address);
    if (juelsAmount.gt(balance)) {
        throw Error(`Insufficent LINK balance. Trying to fund subscription with ${linkAmount} LINK, but only have ${hre.ethers.utils.formatEther(balance)}.`);
    }
    const fundTx = await linkToken.transferAndCall(registryAddress, juelsAmount, hre.ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId]));
    await fundTx.wait();
    const registry = types_1.FunctionsBillingRegistry__factory.connect(registryAddress, signer);
    return (await registry.getSubscription(subscriptionId)).balance;
};
exports.fundSubscription = fundSubscription;
const addSubscriptionConsumer = async (hre, registryAddress, subscriptionId, consumerAddress) => {
    const [signer] = await hre.ethers.getSigners();
    const registry = types_1.FunctionsBillingRegistry__factory.connect(registryAddress, signer);
    const addTx = await registry.addConsumer(subscriptionId, consumerAddress);
    await addTx.wait();
};
exports.addSubscriptionConsumer = addSubscriptionConsumer;
const cancelSubscription = async (hre, registryAddress, subscriptionId, refundAddress) => {
    const [signer] = await hre.ethers.getSigners();
    const subInfo = await (0, exports.getSubscriptionInfo)(hre, registryAddress, subscriptionId);
    if (subInfo.owner !== signer.address) {
        throw Error("The current wallet is not the owner of the subscription");
    }
    if (!refundAddress || refundAddress === "") {
        refundAddress = subInfo.owner;
    }
    const registry = types_1.FunctionsBillingRegistry__factory.connect(registryAddress, signer);
    const cancelTx = await registry.cancelSubscription(subscriptionId, refundAddress);
    await cancelTx.wait();
};
exports.cancelSubscription = cancelSubscription;
//# sourceMappingURL=billingRegistry.js.map