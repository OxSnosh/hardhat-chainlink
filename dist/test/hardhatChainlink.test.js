"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line no-implicit-dependencies
const chai_1 = require("chai");
const HardhatChainlink_1 = require("../src/HardhatChainlink");
const helpers_1 = require("./helpers");
describe("Hardhat Chainlink Tests", function () {
    (0, helpers_1.useEnvironment)("@chainlink/hardhat-chainlink");
    it("Should add the example field", function () {
        chai_1.assert.instanceOf(this.hre.chainlink, HardhatChainlink_1.HardhatChainlink);
    });
});
//# sourceMappingURL=hardhatChainlink.test.js.map