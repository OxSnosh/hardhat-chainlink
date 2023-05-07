"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestConfig = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
var ContentLocation;
(function (ContentLocation) {
    ContentLocation[ContentLocation["Inline"] = 0] = "Inline";
    ContentLocation[ContentLocation["Remote"] = 1] = "Remote";
})(ContentLocation || (ContentLocation = {}));
const CodeLanguage = {
    JavaScript: 0,
};
const ReturnType = {
    uint: "uint256",
    uint256: "uint256",
    int: "int256",
    int256: "int256",
    string: "string",
    bytes: "Buffer",
    Buffer: "Buffer",
};
const calculationExampleJS = `
// This example shows how to calculate a continuously compounding interested rate.
// This calculation would require significant on-chain gas, but is easy for a decentralized oracle network.

// Arguments can be provided when a request is initated on-chain and used in the request source code as shown below
const principalAmount = parseInt(args[4])
const APYTimes100 = parseInt(args[5])
const APYAsDecimalPercentage = APYTimes100 / 100 / 100

const timeInYears = 1 / 12 // represents 1 month
const eulersNumber = 2.7183

// Continuouly-compounding interest formula: A = Pe^(rt)
const totalAmountAfterInterest = principalAmount * eulersNumber ** (APYAsDecimalPercentage * timeInYears)

// The source code MUST return a Buffer or the request will return an error message
// Use one of the following functions to convert to a Buffer representing the response bytes that are returned to the client smart contract:
// - Functions.encodeUint256
// - Functions.encodeInt256
// - Functions.encodeString
// Or return a custom Buffer for a custom byte encoding
return Functions.encodeUint256(Math.round(totalAmountAfterInterest))
`;
// Configure the request by setting the fields below
exports.requestConfig = {
    // location of source code (only Inline is currently supported)
    codeLocation: ContentLocation.Inline,
    // location of secrets (only Inline is currently supported)
    secretsLocation: ContentLocation.Inline,
    // code language (only JavaScript is currently supported)
    codeLanguage: CodeLanguage.JavaScript,
    // string containing the source code to be executed
    source: calculationExampleJS,
    // source: fs.readFileSync('./Functions-request-source-API-example.js').toString(),
    // secrets can be accessed within the source code with `secrets.varName` (ie: secrets.apiKey)
    secrets: { apiKey: process.env.COINMARKETCAP_API_KEY },
    // ETH wallet key used to sign secrets so they cannot be accessed by a 3rd party
    walletPrivateKey: process.env.PRIVATE_KEY,
    // args (string only array) can be accessed within the source code with `args[index]` (ie: args[0]).
    args: ["1", "bitcoin", "btc-bitcoin", "btc", "1000000", "450"],
    // expected type of the returned value
    expectedReturnType: ReturnType.uint256,
    // Redundant URLs which point to encrypted off-chain secrets
    secretsURLs: [],
    // Per-node offchain secrets objects used by the `functions-build-offchain-secrets` command
    // The first entry will be used by the simulator if `secrets` is undefined
    perNodeSecrets: [],
    DONPublicKey: "",
};
//# sourceMappingURL=functions-request-config.js.map