import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Admin from './admin';

ReactDOM.render(
  <Router>
		<Route path="/" exact component={App} />
		<Route path={`/${process.env.REACT_APP_ADMIN_URL}`} component={Admin} />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
