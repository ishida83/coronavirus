import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {subscribeUser} from './subscription';

ReactDOM.render(<App />, document.getElementById('root'));

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  // document.documentElement.style.display = "none";
	document.body.classList.add('dark-theme');
  // document.head.insertAdjacentHTML(
  //   "beforeend",
  //   '<link rel="stylesheet" href="/light.css" onload="document.documentElement.style.display = \'\'">'
  // );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.register();
subscribeUser();
