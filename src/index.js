import "./index.scss";

import React from "react";
import ReactDOM from "react-dom";
// import './index.css';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StatesConfig } from "@react-md/states";

import { Configuration, ConfigurationProps } from "@react-md/layout";
// the ConfigurationProps are just all the props for the providers
// joined together. The only difference is that onResize has been
// renamed to onAppResize for the AppSizeListener
const overrides: ConfigurationProps = {
  // your configuration overrides
};

ReactDOM.render(
  <Configuration {...overrides}>
		<StatesConfig>
    	<App />
		</StatesConfig>
  </Configuration>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
