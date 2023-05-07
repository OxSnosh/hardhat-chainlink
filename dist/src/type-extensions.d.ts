import "hardhat/types/config";
import "hardhat/types/runtime";
import { HardhatChainlink } from "./HardhatChainlink";
declare module "hardhat/types/config" { }
declare module "hardhat/types/runtime" {
    interface HardhatRuntimeEnvironment {
        chainlink: HardhatChainlink;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map