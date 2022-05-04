import { Yearn } from "@yfi/sdk";
import CONSTANTS from "./constants";
import { JsonRpcProvider } from "@ethersproject/providers";

// NOTE set network as ethereum
const chainId = 1;
// Get the RPC depengin on wich network we are using
const provider = getProviderByChain(chainId);

// NOTE We create the yearnSdk instance giving the chain id and provider
const yearnSdk = new Yearn(chainId, {
  provider,
});

export function getProviderByChain(chainId) {
  let rpcUrl;
  // NOTE It is recommended to use Alchemy for your Web3 provider when using the Yearn SDK because of rate limits
  switch (chainId) {
    case 1:
      rpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${CONSTANTS.ALCHEMY_KEY}`;
      break;
    case 250:
      rpcUrl = `https://rpc.ftm.tools/`;
      break;
    default:
      rpcUrl = `https://eth-mainnet.alchemyapi.io/v2/${CONSTANTS.ALCHEMY_KEY}`;
      break;
  }

  return new JsonRpcProvider(rpcUrl);
}

export default yearnSdk;
