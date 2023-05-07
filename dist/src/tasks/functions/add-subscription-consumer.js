"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubscriptionConsumerAction = void 0;
const functions_1 = require("../../functions");
const addSubscriptionConsumerAction = async (taskArgs, hre) => {
    const { subscriptionId, registryAddress, clientContractAddress } = taskArgs;
    console.log(`Adding subscription ${subscriptionId} consumer ${clientContractAddress}...`);
    await (0, functions_1.addSubscriptionConsumer)(hre, registryAddress, subscriptionId, clientContractAddress);
    console.log(`Client ${clientContractAddress} has been authorized with subscription: ${subscriptionId}`);
};
exports.addSubscriptionConsumerAction = addSubscriptionConsumerAction;
//# sourceMappingURL=add-subscription-consumer.js.map