"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveEnsAggregatorAddressWithSubdomains = exports.resolveEnsAggregatorAddress = void 0;
const resolveEnsAggregatorAddress = async (env, baseTick, quoteTick) => {
    const [signer] = await env.ethers.getSigners();
    const proxyAggregatorAddress = await signer.resolveName(`${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`);
    return proxyAggregatorAddress;
};
exports.resolveEnsAggregatorAddress = resolveEnsAggregatorAddress;
const resolveEnsAggregatorAddressWithSubdomains = async (env, baseTick, quoteTick) => {
    const [signer] = await env.ethers.getSigners();
    const proxyAggregatorAddress = await signer.resolveName(`proxy.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`);
    const underlyingAggregatorAddress = await signer.resolveName(`aggregator.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`);
    const proposedAggregatorAddress = await signer.resolveName(`proposed.${baseTick.toLowerCase()}-${quoteTick.toLowerCase()}.data.eth`);
    return {
        proxy: proxyAggregatorAddress,
        underlyingAggregator: underlyingAggregatorAddress,
        proposedAggregator: proposedAggregatorAddress,
    };
};
exports.resolveEnsAggregatorAddressWithSubdomains = resolveEnsAggregatorAddressWithSubdomains;
//# sourceMappingURL=ensFeeds.js.map