"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fundSubscriptionAction = void 0;
const functions_1 = require("../../functions");
const fundSubscriptionAction = async (taskArgs, hre) => {
    const { linkAmount, subscriptionId, registryAddress } = taskArgs;
    console.log(`Funding with subscription ${subscriptionId} with ${linkAmount} LINK`);
    const newBalance = await (0, functions_1.fundSubscription)(hre, registryAddress, subscriptionId, linkAmount);
    console.log(`Subscription ${subscriptionId} new balance: ${hre.ethers.utils.formatEther(newBalance)} LINK`);
};
exports.fundSubscriptionAction = fundSubscriptionAction;
//# sourceMappingURL=fund-subscription.js.map