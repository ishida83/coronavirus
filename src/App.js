// @flow
import React from "react";
import logo from "./logo.svg";
import "./App.scss";

// import SimpleExample from './LeafletMap';
import MapGlMap from './MapGlMap';
// import AMap from './AMap';

function App() {
  const handleClick = () => {
    import("./components/moduleA")
      .then(({ moduleA }) => {
        // Use moduleA
        alert(moduleA);
      })
      .catch(err => {
        // Handle failure
      });
  };

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" onClick={handleClick} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <MapGlMap />
      {/* <AMap /> */}
    </div>
    // <SimpleExample />
  );
}

export default App;
