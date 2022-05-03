import React, { useState, useEffect } from "react";
import yearnSdk from "../sdk";

const Vaults = () => {
  const [loading, setLoading] = useState(false);
  const [vaults, setVaults] = useState([]);

  const getAllVaults = async () => {
    setLoading(true);
    setVaults(await yearnSdk.vaults.get());
    setLoading(false);
  };

  // Helper function to format apy
  const formatAPY = (apy) => {
    return (Number(apy) * 100).toFixed(2);
  };

  useEffect(() => console.log("VAULTS UPDATED", vaults), [vaults]);

  return (
    <div>
      <h2>Vaults</h2>
      <p>Insert Examples intro desc </p>

      <p>get vault metadata</p>
      <p>get positions of user in vaults</p>

      <section>
        <p>Get All Vaults</p>
        <button onClick={getAllVaults} disabled={loading}>
          {loading ? "Loading" : "Get All vaults"}
        </button>

        <p>Vaults: {vaults?.length}</p>
        {!!vaults?.length && (
          <div className="scroll-list">
            {vaults?.map((vault) => {
              return (
                <div key={vault.address}>
                  <p>
                    Vault: {vault.metadata.displayName} ({vault.symbol})
                  </p>
                  <p>APY: {formatAPY(vault.metadata.apy.net_apy)}%</p>
                  <p>
                    ---------------------------------------------------------------------
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default Vaults;
