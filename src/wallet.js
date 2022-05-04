import { ethers } from "ethers";
import yearnSdk, { provider as readProvider } from "./sdk";

async function initWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  if ((await provider.getNetwork()).chainId !== 1) {
    alert("Only mainnet is supported in the examples");
    return;
  }
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  provider.on("network", (newNetwork, oldNetwork) => {
    console.log("network changed", newNetwork, oldNetwork);
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    if (oldNetwork) {
      window.location.reload();
    }
  });
  const walletSigner = provider.getSigner();

  // NOTE We set the SDK write and read provider as the new wallet provider
  // If not, the SDK will use the default provider which is the JSONRpc one
  // And we will not be able to execute txs
  yearnSdk.context.setProvider({
    read: readProvider,
    write: provider,
  });
  return walletSigner;
}

export default initWallet;
