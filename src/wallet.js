import { ethers } from "ethers";
import yearnSdk from "./sdk";

async function initWallet() {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();

  // NOTE We set the SDK write provider as the new wallet provider
  yearnSdk.context.setProvider({
    write: provider,
  });
  return signer;
}

export default initWallet;
