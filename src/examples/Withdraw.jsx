import React, { useState } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";
import initWallet from "../wallet";
import CONSTANTS from "../constants";

const Withdraw = () => {
  const [loading, setLoading] = useState(false);

  const approveWithdrawFromDaiToUSDC = async () => {
    setLoading(true);

    const wallet = await initWallet();
    // User account address
    const accountAddress = await wallet.getAddress();
    // DAI Vault address
    const vaultAddress = CONSTANTS.VAULT_ADDRESSES.DAI;
    // DAI Token address
    const tokenAddress = CONSTANTS.TOKEN_ADDRESSES.USDC;
    // The amount to approve, in this case, we use the MAX_UINT256 constant to approve permanently
    const amount = CONSTANTS.MAX_UINT256;
    try {
      const tx = await yearnSdk.vaults.approveWithdraw(
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

  const withdrawDaiVault = async () => {
    setLoading(true);

    const wallet = await initWallet();
    // DAI Vault address
    const vaultAddress = CONSTANTS.VAULT_ADDRESSES.DAI;
    // DAI Token address
    const tokenAddress = CONSTANTS.TOKEN_ADDRESSES.DAI;

    // Amount to withdraw (1 DAI), we use ethers to format it
    const amount = ethers.utils.parseUnits("1", 18);
    // Slippage tolerance (1%)
    const slippageTolerance = 0.01;
    // User account address
    const accountAddress = await wallet.getAddress();

    // NOTE The withdraw will fail if amount > allowance (the token was not approved before)
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

  const withdrawUsdcFromDai = async () => {
    setLoading(true);

    const wallet = await initWallet();
    // DAI Vault address
    const vaultAddress = CONSTANTS.VAULT_ADDRESSES.DAI;
    // DAI Token address
    const tokenAddress = CONSTANTS.TOKEN_ADDRESSES.USDC;

    // Amount to withdraw (1 DAI), we use ethers to format it
    const amount = ethers.utils.parseUnits("1", 18);
    // Slippage tolerance (1%)
    const slippageTolerance = 0.01;
    // User account address
    const accountAddress = await wallet.getAddress();

    // NOTE The withdraw will fail if amount > allowance (the token was not approved before)
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
        <p>Approve Withdraw from DAI vault to USDC token (ZapOut)</p>
        <button onClick={approveWithdrawFromDaiToUSDC} disabled={loading}>
          {loading ? "Loading" : "Approve Withdraw"}
        </button>
      </section>

      <section>
        <p>Withdraw 1 DAI from DAI vault</p>
        <button onClick={withdrawDaiVault} disabled={loading}>
          {loading ? "Loading" : "Withdraw DAI"}
        </button>
      </section>

      <section>
        <p>Withdraw 1 USDC from DAI vault</p>
        <button onClick={withdrawUsdcFromDai} disabled={loading}>
          {loading ? "Loading" : "Withdraw USDC"}
        </button>
      </section>
    </div>
  );
};;

export default Withdraw;
