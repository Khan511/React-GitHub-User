import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GithubProvider } from "./context/context";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
const root = ReactDOM.createRoot(document.getElementById("root"));

// Domain
// dev-0gecznqgxwme8fdk.eu.auth0.com
// Client ID
// 2C246Ef79nVh9FtaYfJo5tKs3mG1XVGs

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-0gecznqgxwme8fdk.eu.auth0.com"
      clientId="2C246Ef79nVh9FtaYfJo5tKs3mG1XVGs"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <BrowserRouter>
        <GithubProvider>
          <App />
        </GithubProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
