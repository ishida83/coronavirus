// @flow
import React from "react";
import logo from "./logo.svg";
import "./App.scss";

import LeafletMap from "./LeafletMap";
import MapGlMap from "./MapGlMap";
import AMap from './AMap';

class App extends React.Component {
  state = {
    mapType: 'AMap'
  };
  handleClick = () => {
    import("./components/moduleA")
      .then(({ moduleA }) => {
        // Use moduleA
        alert(moduleA);
      })
      .catch((err) => {
        // Handle failure
      });
  };

  switchMapEngine = (mapType) => {
    this.setState({
      mapType
    })
  }

  renderMap = () => {
    switch(this.state.mapType) {
      case 'Leaflet': 
        return <LeafletMap switchMapEngine={this.switchMapEngine} />;
      case 'MapGl':
        return <MapGlMap switchMapEngine={this.switchMapEngine}/>;
      case 'AMap':
        return <AMap switchMapEngine={this.switchMapEngine}/>;
      default:
        return null;
    }
  };

  render() {
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
        {this.renderMap()}
      </div>
    );
  }
}

export default App;
