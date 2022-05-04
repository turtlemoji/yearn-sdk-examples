import React, { useState } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";
import initWallet from "../wallet";

const Deposit = () => {
  const [loading, setLoading] = useState(false);

  const depositToDaiVault = async () => {
    const wallet = await initWallet();
    const chainId = (await wallet.provider.getNetwork()).chainId;
    let vaultAddress, tokenAddress;
    setLoading(true);

    if (chainId === 1) {
      // DAI vault address and token
      vaultAddress = "0xdA816459F1AB5631232FE5e97a05BBBb94970c95";
      tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    } else if (chainId === 250) {
      // FTM vault address and token
      vaultAddress = "0x0DEC85e74A92c52b7F708c4B10207D9560CEFaf0";
      tokenAddress = "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83";
    }

    // Amount to deposit (1 DAI or 1 FTM), we use ethers to format it
    const amount = ethers.utils.parseUnits("1", 18);
    // Slippage tolerance (1%)
    const slippageTolerance = 0.01;
    // User account address
    const accountAddress = await wallet.getAddress();
    // Deposit DAI to DAI or FTM to FTM

    // NOTE The deposit will fail if amount > allowance (the token was not approved before)
    try {
      const tx = await yearnSdk.vaults.deposit(
        vaultAddress,
        tokenAddress,
        amount,
        accountAddress,
        {
          slippage: slippageTolerance,
        }
      );
      console.log(tx);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Deposit</h2>

      <p>Deposit to 1 DAI or 1 FTM depending on the chainId</p>
      <button onClick={depositToDaiVault} disabled={loading}>
        {loading ? "Loading" : "Deposit to DAI or FTM Vault"}
      </button>
    </div>
  );
};

export default Deposit;
