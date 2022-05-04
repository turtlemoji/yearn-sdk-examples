import React, { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";
import WalletContext from "../wallet";

const Balance = () => {
  const [loading, setLoading] = useState(false);
  const wallet = useContext(WalletContext);
  const [vitalikBalances, setVitalikBalances] = useState([]);
  const [balances, setBalances] = useState([]);

  // Just vitalik account to search for tokens
  const account = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

  const getVitalikBalances = async () => {
    setLoading(true);
    // Get all balances for account
    setVitalikBalances(await yearnSdk.tokens.balances(account));
    setLoading(false);
  };

  const getYourBalances = async () => {
    setLoading(true);
    // Get all balances for account
    setBalances(await yearnSdk.tokens.balances(await wallet.getAddress()));
    setLoading(false);
  };

  // Helper function to format balance with ethers
  const formatBalance = (balance, decimals) => {
    return ethers.utils.formatUnits(balance, decimals);
  };

  useEffect(
    () => console.log("VITALIK BALANCES UPDATED", vitalikBalances),
    [vitalikBalances]
  );
  useEffect(() => console.log("YOUR BALANCES UPDATED", balances), [balances]);

  return (
    <div>
      <h2>Balance</h2>

      <section>
        <p>Get your Balances</p>
        <button onClick={getYourBalances} disabled={loading}>
          {loading ? "Loading" : "Get your Balances"}
        </button>

        <p>Your Balances:</p>
        {!!balances?.length && (
          <div className="scroll-list">
            {balances?.map((b) => {
              return (
                <div key={b.address}>
                  {b.token.symbol} :{" "}
                  {formatBalance(b.balance, b.token.decimals)}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <p>Get Vitalik Balances</p>
        <button onClick={getVitalikBalances} disabled={loading}>
          {loading ? "Loading" : "Get Vitalik Balances"}
        </button>

        <p>Balances:</p>
        {!!vitalikBalances?.length && (
          <div className="scroll-list">
            {vitalikBalances?.map((b) => {
              return (
                <div key={b.address}>
                  {b.token.symbol} :{" "}
                  {formatBalance(b.balance, b.token.decimals)}
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Balance;
