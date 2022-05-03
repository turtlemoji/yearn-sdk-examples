import { Yearn } from "@yfi/sdk";
import CONSTANTS from "./constants";
import { JsonRpcProvider } from "@ethersproject/providers";

// NOTE set network as ethereum
const chainId = 1;
// NOTE It is recommended to use Alchemy for your Web3 provider when using the Yearn SDK because of rate limits
const rpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${CONSTANTS.ALCHEMY_KEY}`;

// NOTE We create the yearnSdk instance giving the chain id and provider
const yearnSdk = new Yearn(chainId, {
  provider: new JsonRpcProvider(rpcUrl)
});

export default yearnSdk;
