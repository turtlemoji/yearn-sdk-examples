import React from "react";

const Home = () => (
  <div>
    <h2>Home</h2>

    <p>
      All auto-generated documentation for the SDK can be found here:{" "}
      <a
        href="https://yearn.github.io/yearn-sdk/"
        target="_blank"
        rel="noreferrer"
      >
        Documentation
      </a>
    </p>
    <p>In this example, the SDK configuration and init is done on sdk.js</p>
    <p>The wallet logic is inside wallet.js</p>
    <p>All the examples should work with ETHEREUM network.</p>
    <p>
      All the results will be console logged so open the console to check RAW
      data, since the displayed data will be just an example of some properties
    </p>
  </div>
);

export default Home;
