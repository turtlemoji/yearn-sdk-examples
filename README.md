<span>
    <img align="right" src="https://raw.githubusercontent.com/yearn/yearn-sdk/master/.github/media/sdk.png" height="150" />
</span>

# Yearn SDK Examples

This repository contains a live preview and example usage of the [Yearn SDK](https://github.com/yearn/yearn-sdk)

> Explore this codebase to learn how to start interacting with the Yearn protocol in your own app!

## Live Preview Sandbox

* [**Click here to go to the live preview sandbox**](https://codesandbox.io/s/github/turtlemoji/yearn-sdk-examples/tree/main/)

[![Live Preview Sandbox](https://user-images.githubusercontent.com/7863230/166849609-6d9da91d-9c2c-48d4-afd4-4a053c891724.png)](https://codesandbox.io/s/github/turtlemoji/yearn-sdk-examples/tree/main/)

## Getting Started with the developer environment

1) `git clone https://github.com/turtlemoji/yearn-sdk-examples.git` to download the latest version

1) `yarn install` to install dependencies with yarn

1) [Create an Alchemy account](https://www.alchemy.com/) and put the key in [src/constants.js](./src/constants.js)

1) `yarn start` to run the developer environment

## Core files

* [src/index.js](./src/index.js) -> Boostraps React (enables [StrictMode](https://reactjs.org/docs/strict-mode.html)) and imports the main component from `src/App.jsx`

* [src/App.jsx](./src/App.jsx) -> Boostraps the examples homepage and setups the routing code for each example page found at `src/examples/`

* [src/examples/Balance.jsx](./src/examples/Balance.jsx) -> Example page for using the SDK to list balances of tokens from a wallet

* [*rc/examples/Vaults.jsx](./src/examples/Vaults.jsx) -> Example page for using the SDK to list Yearn Vaults and get detailed information from a single vault

* [src/examples/Deposit.jsx](./src/examples/Deposit.jsx) -> Example page for using the SDK to **deposit** a token at a Yearn Vault

* [src/examples/Withdraw.jsx](./src/examples/Withdraw.jsx) -> Example page for using the SDK to **withdraw** a token at a Yearn Vault

* [src/Home.jsx](./src/Home.jsx) -> Initial page loaded when no example is selected

* [src/styles.scss](./src/styles.scss) -> CSS file to create styling for components

* [public/index.html](./public/index.html) -> HTML file where React will inject the export from `src/index.js``

* [src/sdk.js](./src/sdk.js) -> SDK initialization code

* [src/wallet.js](./src/wallet.js) -> Browser Wallet connection initialization code

* [src/constants.js](./src/constants.js) -> API Keys and fixed addresses used

## More information
* **Yearn SDK Stack**: https://docs.yearn.finance/vaults/yearn-sdk/yearn-stack
* **Yearn SDK Repository**: https://github.com/yearn/yearn-sdk
* **Yearn SDK Documentation**: https://yearn.github.io/yearn-sdk/
* **Yearn API**: https://docs.yearn.finance/vaults/yearn-api
* **Yearn Protocol Documentation**: https://docs.yearn.finance/
* **Yearn Partner Documentation**: https://docs.yearn.finance/partners/introduction
* **What are Vaults and Strategies?**: https://medium.com/iearn/yearn-finance-explained-what-are-vaults-and-strategies-96970560432
