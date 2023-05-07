"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelSubscriptionAction = void 0;
const functions_1 = require("../../functions");
const cancelSubscriptionAction = async (taskArgs, hre) => {
    const { refundAddress, subscriptionId, registryAddress } = taskArgs;
    console.log(`Cancelling subscription ${subscriptionId} with refund to ${refundAddress || "owner"}...`);
    await (0, functions_1.cancelSubscription)(hre, registryAddress, subscriptionId, refundAddress);
    console.log(`Subscription ${subscriptionId} has been cancelled.`);
};
exports.cancelSubscriptionAction = cancelSubscriptionAction;
//# sourceMappingURL=cancel-subscription.js.map