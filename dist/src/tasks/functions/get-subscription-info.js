"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionInfo = void 0;
const getSubscriptionInfo = async (taskArgs, hre) => {
    const { registryAddress, subscriptionId } = taskArgs;
    console.log(`Reading subscription ${subscriptionId} info from Functions registry ${registryAddress} on network ${hre.network.name}`);
    const subInfo = await hre.chainlink.functionsGetSubscriptionInfo(registryAddress, subscriptionId);
    console.table({
        Owner: subInfo.owner,
        Balance: `${hre.ethers.utils.formatEther(subInfo.balance)} LINK`,
    });
    console.log(`Authorized consumers:`);
    console.table(subInfo.consumers);
};
exports.getSubscriptionInfo = getSubscriptionInfo;
//# sourceMappingURL=get-subscription-info.js.map