import React, { useState } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";
import initWallet from "../wallet";
import CONSTANTS from "../constants";

const Withdraw = () => {
  const [loading, setLoading] = useState(false);

  const withdrawDaiVault = async () => {
    setLoading(true);

    const wallet = await initWallet();
    // DAI Vault address
    const vaultAddress = CONSTANTS.VAULT_ADDRESSES.DAI;
    // DAI Token address
    const tokenAddress = CONSTANTS.TOKEN_ADDRESSES.DAI;

    // Amount to deposit (1 DAI), we use ethers to format it
    const amount = ethers.utils.parseUnits("1", 18);
    // Slippage tolerance (1%)
    const slippageTolerance = 0.01;
    // User account address
    const accountAddress = await wallet.getAddress();
    // Deposit DAI to DAI or FTM to FTM

    // NOTE The deposit will fail if amount > allowance (the token was not approved before)
    try {
      const tx = await yearnSdk.vaults.withdraw(
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
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>

      <section>
        <p>Withdraw all from DAI vault</p>
        <button onClick={withdrawDaiVault} disabled={loading}>
          {loading ? "Loading" : "Withdraw DAI"}
        </button>
      </section>
    </div>
  );
};

export default Withdraw;
