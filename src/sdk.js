import { Yearn } from "@yfi/sdk";
import CONSTANTS from "./constants";
import { JsonRpcProvider } from "@ethersproject/providers";

// NOTE set network as ethereum
const chainId = 1;
// Get the RPC depengin on wich network we are using
export const rpcUrl = getRPCUrl(chainId);
export const provider = new JsonRpcProvider(rpcUrl);

// NOTE We create the yearnSdk instance giving the chain id and provider
const yearnSdk = new Yearn(chainId, {
  provider,
});

function getRPCUrl(chainId) {
  if (chainId !== 1) {
    alert("Only mainnet is supported in the examples");
  }
  // NOTE It is recommended to use Alchemy for your Web3 provider when using the Yearn SDK because of rate limits
  switch (chainId) {
    case 1:
      return `https://eth-mainnet.alchemyapi.io/v2/${CONSTANTS.ALCHEMY_KEY}`;
      break;
    case 250:
      return `https://rpc.ftm.tools/`;
      break;

    default:
      return `https://eth-mainnet.alchemyapi.io/v2/${CONSTANTS.ALCHEMY_KEY}`;
      break;
  }
}

export default yearnSdk;
