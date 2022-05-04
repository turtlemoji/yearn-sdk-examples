import React, { useState } from "react";
import yearnSdk from "../sdk";
import initWallet from "../wallet";

const Deposit = () => {
  const [loading, setLoading] = useState(false);

  const depositToDaiVault = async () => {
    const wallet = await initWallet();
    setLoading(true);

    const vaultAddress = "0xdA816459F1AB5631232FE5e97a05BBBb94970c95";
    const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    const amount = (1 * 10 ** 18).toString();
    const slippageTolerance = 0.01;
    const accountAddress = await wallet.getAddress();
    console.log("Account:", accountAddress);
    // Deposit DAI to DAI vault
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
    setLoading(false);
  };

  return (
    <div>
      <h2>Deposit</h2>

      <p>Deposit to specific vault</p>
      <button onClick={depositToDaiVault} disabled={loading}>
        {loading ? "Loading" : "Deposit to DAI Vault"}
      </button>
    </div>
  );
};

export default Deposit;
