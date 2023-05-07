"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionAction = void 0;
const types_1 = require("../../../types");
const functions_1 = require("../../functions");
const createSubscriptionAction = async (taskArgs, hre) => {
    const { linkAmount, clientContractAddress, registryAddress } = taskArgs;
    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];
    console.log(`Creating a new subscription with registry ${registryAddress}...`);
    const registry = types_1.FunctionsBillingRegistry__factory.connect(registryAddress, signer);
    const createSubscriptionTx = await registry.createSubscription();
    const createSubscriptionReceipt = await createSubscriptionTx.wait();
    if (!createSubscriptionReceipt ||
        !createSubscriptionReceipt.events ||
        !createSubscriptionReceipt.events[0].args) {
        throw Error("Failed to create a new subscription");
    }
    const subscriptionId = createSubscriptionReceipt.events[0].args.subscriptionId.toNumber();
    console.table({ "Subscription ID": subscriptionId });
    if (linkAmount) {
        console.log(`Funding with subscription ${subscriptionId} with ${linkAmount} LINK...`);
        const newBalance = await (0, functions_1.fundSubscription)(hre, registryAddress, subscriptionId, linkAmount);
        console.log(`Subscription ${subscriptionId} new balance: ${hre.ethers.utils.formatEther(newBalance)} LINK`);
    }
    if (clientContractAddress) {
        console.log(`Adding subscription ${subscriptionId} consumer ${clientContractAddress}...`);
        await (0, functions_1.addSubscriptionConsumer)(hre, registryAddress, subscriptionId, clientContractAddress);
        console.log(`Client ${clientContractAddress} has been authorized with subscription: ${subscriptionId}`);
    }
};
exports.createSubscriptionAction = createSubscriptionAction;
//# sourceMappingURL=create-subscription.js.map