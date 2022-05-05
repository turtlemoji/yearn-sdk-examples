import React, { useState, useEffect } from "react";
import CONSTANTS from "../constants";
import yearnSdk from "../sdk";

const Vaults = () => {
  const [loading, setLoading] = useState(false);
  const [vaults, setVaults] = useState([]);
  // const [daiMetadata, setDaiMetadata] = useState({});
  const [daiVault, setDaiVault] = useState({});
  const [supportedTokens, setSupportedTokens] = useState({});

  const getAllVaults = async () => {
    setLoading(true);
    // Get All Vaults
    setVaults(await yearnSdk.vaults.get());
    setLoading(false);
  };

  const getDAIVault = async () => {
    setLoading(true);
    // Get DAI Vault
    const daiVault = await yearnSdk.vaults.get([CONSTANTS.VAULT_ADDRESSES.DAI]);
    // Get DAI Token Metadata
    const daiTokenMetadata = await yearnSdk.tokens.metadata([
      CONSTANTS.TOKEN_ADDRESSES.DAI,
    ]);
    // Merge DAI Vault with DAI Token Metadata
    // The response is an array so we need to use the first element of the two responses
    const mergedVault = { ...daiVault[0], tokenMetadata: daiTokenMetadata[0] };
    setDaiVault(mergedVault);
    setLoading(false);
  };

  const getSupportedTokens = async () => {
    setLoading(true);
    // Get DAI Vault
    setSupportedTokens(await yearnSdk.tokens.supported());
    setLoading(false);
  };

  // NOTE The metadata query requires to configure the SDK subgraph
  // const getDaiMetadata = async () => {
  //   setLoading(true);
  //   try {
  //     // Get DAI metadata
  //     setDaiMetadata(
  //       await yearnSdk.vaults.metadataOf("", [CONSTANTS.VAULT_ADDRESSES.DAI])
  //     );
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //   }
  // };

  // Helper function to format apy
  const formatAPY = (apy) => {
    return (Number(apy) * 100).toFixed(2);
  };

  useEffect(() => console.log("VAULTS UPDATED", vaults), [vaults]);
  useEffect(() => console.log("DAI VAULT UPDATED", daiVault), [daiVault]);
  useEffect(
    () => console.log("SUPPORTED TOKENS UPDATED", supportedTokens),
    [supportedTokens]
  );

  return (
    <div>
      <h2>Vaults</h2>

      <p>TODO get positions of user in vaults</p>

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
        <p>Get Supported Tokens</p>
        <button onClick={getSupportedTokens} disabled={loading}>
          {loading ? "Loading" : "Get supported tokens"}
        </button>

        <p>Supported Tokens: {supportedTokens?.length}</p>
        {!!supportedTokens?.length && (
          <div className="scroll-list">
            {supportedTokens?.map((token) => {
              return (
                <div key={token.address}>
                  <p>{token.symbol}</p>
                  <div className="v-separator"></div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <p>Get DAI Vault and underlying token metadata (DAI)</p>
        <button onClick={getDAIVault} disabled={loading}>
          {loading ? "Loading" : "Get DAI vault"}
        </button>

        <p>DAI Vault:</p>
        {!!Object.keys(daiVault).length && (
          <div className="scroll-list">
            <div>
              <p>
                Vault: {daiVault.metadata?.displayName} ({daiVault.symbol})
              </p>
              <p>Description: {daiVault.tokenMetadata.description}</p>
              <p>APY: {formatAPY(daiVault.metadata?.apy.net_apy)}%</p>
              <div className="v-separator"></div>
            </div>
          </div>
        )}
      </section>

      {/* <section>
        <p>Get DAI Vault Metadata</p>
        <button onClick={getDaiMetadata} disabled={loading}>
          {loading ? "Loading" : "Get Vault metadata"}
        </button>
        {!!daiMetadata?.length && (
          <div className="scroll-list">
            {daiMetadata?.map((vault) => {
              return (
                <div key={vault.address}>
                  <p>Metadata TODO</p>
                  <div className="v-separator"></div>
                </div>
              );
            })}
          </div>
        )}
      </section> */}
    </div>
  );
};

export default Vaults;
