"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
const argumentTypes_1 = require("hardhat/internal/core/params/argumentTypes");
const plugins_1 = require("hardhat/plugins");
const HardhatChainlink_1 = require("./HardhatChainlink");
const create_job_1 = require("./tasks/create-job");
const deploy_link_token_1 = require("./tasks/deploy-link-token");
const deploy_oracle_1 = require("./tasks/deploy-oracle");
const add_subscription_consumer_1 = require("./tasks/functions/add-subscription-consumer");
const cancel_subscription_1 = require("./tasks/functions/cancel-subscription");
const create_subscription_1 = require("./tasks/functions/create-subscription");
const deploy_consumer_contract_1 = require("./tasks/functions/deploy-consumer-contract");
const fund_subscription_1 = require("./tasks/functions/fund-subscription");
const generate_consumer_contract_1 = require("./tasks/functions/generate-consumer-contract");
const get_subscription_info_1 = require("./tasks/functions/get-subscription-info");
const simulate_request_1 = require("./tasks/functions/simulate-request");
const fund_1 = require("./tasks/fund");
const node_info_1 = require("./tasks/node-info");
const run_node_1 = require("./tasks/run-node");
require("./type-extensions");
(0, config_1.extendConfig)((config, userConfig) => { });
(0, config_1.extendEnvironment)((hre) => {
    hre.chainlink = (0, plugins_1.lazyObject)(() => new HardhatChainlink_1.HardhatChainlink(hre));
});
(0, config_1.task)("chainlink:run-node", "Runs the chainlink node")
    .addOptionalPositionalParam("restartOnly", "Restart the existing containers instead of removing and recreating them", false, argumentTypes_1.boolean)
    .setAction(run_node_1.runNode);
(0, config_1.task)("chainlink:create-job", "Creates the job")
    .addPositionalParam("oracleAddress", "Address of Oracle")
    .addOptionalPositionalParam("jobType", "direct or cron", "direct")
    .setAction(create_job_1.createJob);
(0, config_1.task)("chainlink:deploy-link", "Deploys the Link token into a running node").setAction(deploy_link_token_1.deployLinkToken);
(0, config_1.task)("chainlink:deploy-oracle", "Deploys the oracle")
    .addPositionalParam("nodeAddress", "The node address")
    .addPositionalParam("linkAddress", "The Link token address")
    .setAction(deploy_oracle_1.deployOracle);
(0, config_1.task)("chainlink:fund-eth", "Funds the node with ETH")
    .addPositionalParam("nodeAddress", "The node address")
    .addPositionalParam("amount", "Amount to fund")
    .setAction(fund_1.fundEth);
(0, config_1.task)("chainlink:fund-link", "Funds the node with LINK")
    .addPositionalParam("linkAddress", "The link token address")
    .addPositionalParam("contractAddress", "The consumer contract address")
    .setAction(fund_1.fundLink);
(0, config_1.task)("chainlink:node-info", "Get node info").setAction(node_info_1.nodeInfo);
(0, config_1.task)("chainlink:functions-get-subscription-info", "Retrieve Functions subscription info")
    .addPositionalParam("registryAddress", "FunctionsBillingRegistry contract address")
    .addPositionalParam("subscriptionId", "Subscription ID")
    .setAction(get_subscription_info_1.getSubscriptionInfo);
(0, config_1.task)("chainlink:functions-deploy-consumer-contract", "Deploys FunctionsConsumer contract")
    .addPositionalParam("oracleAddress", "FunctionsOracle contract address")
    .addOptionalPositionalParam("verifyContract", "Verify deployed contract with Etherscan")
    .setAction(deploy_consumer_contract_1.deployConsumerContract);
(0, config_1.task)("chainlink:functions-simulate-request", "Simulates an end-to-end fulfillment locally for the FunctionsConsumer contract")
    .addPositionalParam("functionsPublicKey", "Functions DON public key (hex without 0x prefix)")
    .addOptionalParam("gasLimit", "Maximum amount of gas that can be used to call fulfillRequest in the client contract (defaults to 100,000)")
    .setAction(simulate_request_1.simulateRequestAction);
(0, config_1.task)("chainlink:functions-generate-consumer-contract", "Generates a new FunctionsConsumer.sol contract in your contracts directory").setAction(generate_consumer_contract_1.generateConsumerContract);
(0, config_1.task)("chainlink:functions-fund-subscription", "Funds an existing subscription with the given amount of LINK")
    .addPositionalParam("registryAddress", "FunctionsBillingRegistry address")
    .addPositionalParam("subscriptionId", "A subscription ID")
    .addPositionalParam("linkAmount", "Amount of LINK to fund the subscription")
    .setAction(fund_subscription_1.fundSubscriptionAction);
(0, config_1.task)("chainlink:functions-create-subscription", "Creates a new subscription")
    .addPositionalParam("registryAddress", "FunctionsBillingRegistry address")
    .addOptionalPositionalParam("clientContractAddress", "Address of the client contract address authorized to use the new billing subscription")
    .addOptionalPositionalParam("linkAmount", "Initial amount used to fund the subscription in LINK")
    .setAction(create_subscription_1.createSubscriptionAction);
(0, config_1.task)("chainlink:functions-add-subscription-consumer", "Authorize a client contract address to consumer the subscription")
    .addPositionalParam("registryAddress", "FunctionsBillingRegistry address")
    .addPositionalParam("subscriptionId", "A subscription ID")
    .addPositionalParam("clientContractAddress", "A client contract address")
    .setAction(add_subscription_consumer_1.addSubscriptionConsumerAction);
(0, config_1.task)("chainlink:functions-cancel-subscription", "Cancels a subscription and refunds to a specified address")
    .addPositionalParam("registryAddress", "FunctionsBillingRegistry address")
    .addPositionalParam("subscriptionId", "A subscription ID to cancel")
    .addOptionalPositionalParam("refundAddress", "An address to refund (defaults to subscription owner)")
    .setAction(cancel_subscription_1.cancelSubscriptionAction);
//# sourceMappingURL=index.js.map