import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Web3ReactProvider } from "@web3-react/core";
import { HashRouter } from "react-router-dom";
import {
  networkConnection,
  injectedConnection,
  walletConnectConnection,
  coinbaseWalletConnection,
} from "./connectors/connections";
import { Buffer } from "buffer";
import { Provider } from "react-redux";
import { store } from "./features/store";


const connectors = [
  [injectedConnection.connector, injectedConnection.hooks],
  [walletConnectConnection.connector, walletConnectConnection.hooks],
  [coinbaseWalletConnection.connector, coinbaseWalletConnection.hooks],
  [networkConnection.connector, networkConnection.hooks],
];

window.Buffer = window.Buffer || Buffer;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3ReactProvider connectors={connectors}>
        <HashRouter>
          <App />
        </HashRouter>
      </Web3ReactProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
