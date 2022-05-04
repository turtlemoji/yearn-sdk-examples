import React, { useState, useEffect } from "react";
import CONSTANTS from "../constants";
import yearnSdk from "../sdk";

const Vaults = () => {
  const [loading, setLoading] = useState(false);
  const [vaults, setVaults] = useState([]);
  const [daiMetadata, setDaiMetadata] = useState({});

  const getAllVaults = async () => {
    setLoading(true);
    // Get All Vaults
    setVaults(await yearnSdk.vaults.get());
    setLoading(false);
  };

  // NOTE The metadata query requires to configure the SDK subgraph
  const getDaiMetadata = async () => {
    setLoading(true);
    let daiMetadata;
    try {
      // Get DAI metadata
      daiMetadata = await yearnSdk.vaults.metadataOf("", [
        CONSTANTS.VAULT_ADDRESSES.DAI,
      ]);
      setVaults(daiMetadata);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };

  // Helper function to format apy
  const formatAPY = (apy) => {
    return (Number(apy) * 100).toFixed(2);
  };

  useEffect(() => console.log("VAULTS UPDATED", vaults), [vaults]);

  return (
    <div>
      <h2>Vaults</h2>

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
                  <div className="v-separator"></div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <p>Get DAI Vault Metadata</p>
        <button onClick={getDaiMetadata} disabled={loading}>
          {loading ? "Loading" : "Get Vault metadata"}
        </button>
      </section>
    </div>
  );
};

export default Vaults;
