"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulateRequestAction = void 0;
const plugins_1 = require("hardhat/plugins");
const FunctionsBillingRegistry_json_1 = __importDefault(require("../../../artifacts/@chainlink/contracts/src/v0.8/dev/functions/FunctionsBillingRegistry.sol/FunctionsBillingRegistry.json"));
const FunctionsOracle_json_1 = __importDefault(require("../../../artifacts/@chainlink/contracts/src/v0.8/dev/functions/FunctionsOracle.sol/FunctionsOracle.json"));
const FunctionsOracleFactory_json_1 = __importDefault(require("../../../artifacts/@chainlink/contracts/src/v0.8/dev/functions/FunctionsOracleFactory.sol/FunctionsOracleFactory.json"));
const types_1 = require("../../../types");
const addresses_1 = require("../../addresses");
const functions_request_config_1 = require("./functions-request-config");
const { simulateRequest, buildRequest, getDecodedResultLog, getRequestConfig,
/* tslint:disable-next-line */
 } = require("../../FunctionsSandboxLibrary");
const simulateRequestAction = async (taskArgs, hre) => {
    const { functionsPublicKey } = taskArgs;
    const gasLimit = taskArgs.gasLimit ?? 100000;
    if (gasLimit > 300000) {
        throw Error("Gas limit must be less than or equal to 300,000");
    }
    if (hre.network.config.chainId === undefined) {
        throw new plugins_1.HardhatPluginError("hardhat-chainlink", "Current network does not have chainId specified");
    }
    const accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    const chainID = hre.network.config.chainId || 31337;
    const linkTokenAddress = (0, addresses_1.getLinkTokenAddress)(chainID);
    const linkEthFeedAddress = (0, addresses_1.getLinkEthPriceFeedAddress)(chainID);
    // Deploy a mock oracle & registry contract to simulate a fulfillment
    const { oracle, registry, linkToken } = await deployMockOracle(hre, linkTokenAddress, linkEthFeedAddress, functionsPublicKey);
    // Deploy the client contract
    const clientFactory = await hre.ethers.getContractFactory("FunctionsConsumer");
    const client = await clientFactory.deploy(oracle.address);
    await client.deployed();
    const whitelistTx = await oracle.addAuthorizedSenders([deployer.address]);
    await whitelistTx.wait(1);
    // Create & fund a subscription
    const createSubscriptionTx = await registry.createSubscription();
    const createSubscriptionReceipt = await createSubscriptionTx.wait(1);
    const subscriptionId = createSubscriptionReceipt.events[0].args.subscriptionId.toNumber();
    const juelsAmount = hre.ethers.utils.parseUnits("10");
    await linkToken.transferAndCall(registry.address, juelsAmount, hre.ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId]));
    // Authorize the client contract to use the subscription
    await registry.addConsumer(subscriptionId, client.address);
    // Build the parameters to make a request from the client contract
    const buildRequestConfig = functions_request_config_1.requestConfig;
    // Fetch the DON public key from on-chain
    const DONPublicKey = await oracle.getDONPublicKey();
    // Remove the preceeding 0x from the DON public key
    buildRequestConfig.DONPublicKey = DONPublicKey.slice(2);
    const request = await buildRequest(buildRequestConfig);
    // Make a request & simulate a fulfillment
    await new Promise(async (resolve) => {
        // Initiate the request from the client contract
        const clientContract = await clientFactory.attach(client.address);
        const requestTx = await clientContract.executeRequest(request.source, request.secrets ?? [], request.args ?? [], subscriptionId, gasLimit);
        const requestTxReceipt = await requestTx.wait(1);
        const requestId = requestTxReceipt.events[2].args.id;
        // Simulating the JavaScript code locally
        console.log("Executing JavaScript request source code locally...");
        const unvalidatedRequestConfig = functions_request_config_1.requestConfig;
        const thisRequestConfig = getRequestConfig(unvalidatedRequestConfig);
        if (thisRequestConfig.secretsLocation === 1) {
            if (!thisRequestConfig.secrets ||
                Object.keys(thisRequestConfig.secrets).length === 0) {
                console.log("Using secrets assigned to the first node as no default secrets were provided");
                thisRequestConfig.secrets = thisRequestConfig.perNodeSecrets[0] ?? {};
            }
        }
        const { success, result, resultLog } = await simulateRequest(thisRequestConfig);
        console.log(resultLog);
        // Simulate a request fulfillment
        const dummyTransmitter = accounts[0].address;
        const dummySigners = Array(31).fill(dummyTransmitter);
        const i = 0;
        try {
            const fulfillTx = await registry.fulfillAndBill(requestId, success ? result : "0x", success ? "0x" : result, dummyTransmitter, dummySigners, 4, 100000, 500000, {
                gasLimit: 500000,
            });
            const fulfillTxData = await fulfillTx.wait(1);
        }
        catch (fulfillError) {
            // Catch & report any unexpected fulfillment errors
            console.log("\nUnexpected error encountered when calling fulfillRequest in client contract.");
            console.log(fulfillError);
            resolve();
        }
        // Listen for the OCRResponse event & log the simulated response returned to the client contract
        client.on("OCRResponse", async (eventRequestId, presult, err) => {
            console.log("__Simulated On-Chain Response__");
            if (eventRequestId !== requestId) {
                throw new Error(`${eventRequestId} is not equal to ${requestId}`);
            }
            // Check for & log a successful request
            if (presult !== "0x") {
                console.log(`Response returned to client contract represented as a hex string: ${presult}\n${getDecodedResultLog(thisRequestConfig, presult)}`);
            }
            // Check for & log a request that returned an error message
            if (err !== "0x") {
                console.log(`Error message returned to client contract: "${Buffer.from(err.slice(2), "hex")}"\n`);
            }
        });
        // Listen for the BillingEnd event & log the estimated billing data
        registry.on("BillingEnd", async (eventRequestId, eventSubscriptionId, eventSignerPayment, eventTransmitterPayment, eventTotalCost, eventSuccess) => {
            if (requestId === eventRequestId) {
                // Check for a successful request & log a mesage if the fulfillment was not successful
                if (!eventSuccess) {
                    console.log("\nError encountered when calling fulfillRequest in client contract.\n" +
                        "Ensure the fulfillRequest function in the client contract is correct and the --gaslimit is sufficent.\n");
                }
                console.log(`Estimated transmission cost: ${hre.ethers.utils.formatUnits(eventTransmitterPayment, 18)} LINK (This will vary based on gas price)`);
                console.log(`Base fee: ${hre.ethers.utils.formatUnits(eventSignerPayment, 18)} LINK`);
                console.log(`Total estimated cost: ${hre.ethers.utils.formatUnits(eventTotalCost, 18)} LINK`);
                return resolve();
            }
        });
    });
};
exports.simulateRequestAction = simulateRequestAction;
const deployMockOracle = async (hre, linkTokenAddress, linkEthFeedAddress, functionsPublicKey) => {
    const accounts = await hre.ethers.getSigners();
    const deployer = accounts[0];
    const linkToken = types_1.LinkTokenInterface__factory.connect(linkTokenAddress, deployer);
    // Deploy the mock oracle factory contract
    console.log("Deploying FunctionsOracleFactory...");
    const oracleFactoryFactory = await hre.ethers.getContractFactoryFromArtifact(FunctionsOracleFactory_json_1.default);
    const oracleFactory = await oracleFactoryFactory.deploy();
    console.log(`TX hash: ${oracleFactory.deployTransaction.hash}`);
    await oracleFactory.deployed();
    // Deploy the mock oracle contract
    console.log("Deploying FunctionsOracle...");
    const OracleDeploymentTransaction = await oracleFactory.deployNewOracle();
    const OracleDeploymentReceipt = await OracleDeploymentTransaction.wait(1);
    const FunctionsOracleAddress = OracleDeploymentReceipt.events[1].args.don;
    const oracle = await hre.ethers.getContractAtFromArtifact(FunctionsOracle_json_1.default, FunctionsOracleAddress, deployer);
    // Accept ownership of the mock oracle contract
    const acceptTx = await oracle.acceptOwnership();
    await acceptTx.wait(1);
    // Set the secrets encryption public DON key in the mock oracle contract
    await oracle.setDONPublicKey("0x" + functionsPublicKey);
    // Deploy the mock registry billing contract
    console.log("Deploying FunctionsBillingRegistry...");
    const registryFactory = await hre.ethers.getContractFactoryFromArtifact(FunctionsBillingRegistry_json_1.default);
    const registry = await registryFactory.deploy(linkTokenAddress, linkEthFeedAddress, FunctionsOracleAddress);
    console.log(`TX hash: ${registry.deployTransaction.hash}`);
    await registry.deployed();
    // Set registry configuration
    const config = {
        maxGasLimit: 400000,
        stalenessSeconds: 86400,
        gasAfterPaymentCalculation: 21000 + 5000 + 2100 + 20000 + 2 * 2100 - 15000 + 7315,
        weiPerUnitLink: hre.ethers.BigNumber.from("5000000000000000"),
        gasOverhead: 100000,
        requestTimeoutSeconds: 300,
    };
    await registry.setConfig(config.maxGasLimit, config.stalenessSeconds, config.gasAfterPaymentCalculation, config.weiPerUnitLink, config.gasOverhead, config.requestTimeoutSeconds);
    // Set the current account as an authorized sender in the mock registry to allow for simulated local fulfillments
    console.log("Configuring registry and oracle...");
    await registry.setAuthorizedSenders([oracle.address, deployer.address]);
    await oracle.setRegistry(registry.address);
    console.table({
        Oracle: oracle.address,
        Registry: registry.address,
        LinkToken: linkToken.address,
    });
    return { oracle, registry, linkToken };
};
//# sourceMappingURL=simulate-request.js.map