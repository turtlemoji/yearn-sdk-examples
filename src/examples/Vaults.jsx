import React, { useState } from "react";
// import yearnSdk from "../sdk";

const Vaults = () => {
  const [loading, setLoading] = useState(false);
  setLoading(false);

  return (
    <div>
      <h2>Vaults</h2>
      <p>Insert Examples intro desc </p>

      <p>get vault metadata</p>
      <p>get positions of user in vaults</p>

      <section>
        <p>Get Vaults</p>
        <button disabled={loading}>
          {loading ? "Loading" : "Get Vitalik Balances"}
        </button>
      </section>
    </div>
  );
};

export default Vaults;
