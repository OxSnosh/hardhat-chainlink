declare enum ContentLocation {
    Inline = 0,
    Remote = 1
}
export declare const requestConfig: {
    codeLocation: ContentLocation;
    secretsLocation: ContentLocation;
    codeLanguage: number;
    source: string;
    secrets: {
        apiKey: string | undefined;
    };
    walletPrivateKey: string | undefined;
    args: string[];
    expectedReturnType: string;
    secretsURLs: never[];
    perNodeSecrets: never[];
    DONPublicKey: string;
};
export {};
//# sourceMappingURL=functions-request-config.d.ts.map