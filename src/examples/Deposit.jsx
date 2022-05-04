import React, { useState } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";
import initWallet from "../wallet";
import CONSTANTS from "../constants";

const Deposit = () => {
  const [loading, setLoading] = useState(false);

  const approveDai = async () => {
    setLoading(true);

    const wallet = await initWallet();
    // User account address
    const accountAddress = await wallet.getAddress();
    // DAI Vault address
    const vaultAddress = "0xdA816459F1AB5631232FE5e97a05BBBb94970c95";
    // DAI Token address
    const tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
    // The amount to approve, in this case, we use the MAX_UINT256 constant to approve permanently
    const amount = CONSTANTS.MAX_UINT256;
    try {
      const tx = await yearnSdk.vaults.approveDeposit(
        accountAddress,
        vaultAddress,
        tokenAddress,
        amount
      );
      console.log(tx);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const depositToDaiVault = async () => {
    setLoading(true);

    const wallet = await initWallet();
    let vaultAddress, tokenAddress;

    // DAI Vault address
    vaultAddress = "0xdA816459F1AB5631232FE5e97a05BBBb94970c95";
    // DAI Token address
    tokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

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
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Approve</h2>

      <section>
        <p>Approve DAI permanently</p>
        <button onClick={approveDai} disabled={loading}>
          {loading ? "Loading" : "Approve DAI"}
        </button>
      </section>

      <h2>Deposit</h2>

      <section>
        <p>Deposit to 1 DAI to DAI vault</p>
        <button onClick={depositToDaiVault} disabled={loading}>
          {loading ? "Loading" : "Deposit DAI"}
        </button>
      </section>
    </div>
  );
};

export default Deposit;
