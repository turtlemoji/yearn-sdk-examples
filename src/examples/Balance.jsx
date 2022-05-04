import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import yearnSdk from "../sdk";

const Balance = () => {
  const [loading, setLoading] = useState(false);
  const [balances, setBalances] = useState([]);

  // Just vitalik account to search for tokens
  const account = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B";

  const getAccountBalances = async () => {
    setLoading(true);
    // Get all balances for account
    setBalances(await yearnSdk.tokens.balances(account));
    setLoading(false);
  };

  // Helper function to format balance with ethers
  const formatBalance = (balance, decimals) => {
    return ethers.utils.formatUnits(balance, decimals);
  };

  useEffect(() => console.log("BALANCES UPDATED", balances), [balances]);

  return (
    <div>
      <h2>Balance</h2>

      <section>
        <p>Get Account Balances</p>
        <button onClick={getAccountBalances} disabled={loading}>
          {loading ? "Loading" : "Get Vitalik Balances"}
        </button>

        <p>Balances:</p>
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
    </div>
  );
};

export default Balance;
