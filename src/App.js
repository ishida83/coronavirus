// @flow
import React from "react";
import { Motion, spring } from "react-motion";

import logo from "./logo.svg";
import "./App.scss";

import LeafletMap from "./LeafletMap";
import MapGlMap from "./MapGlMap";
import AMap from "./AMap";
import QMap from "./QMap";
import BaiduMap from "./BaiduMap";

class App extends React.Component {
  state = {
    mapType: "Leaflet",
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
      mapType,
    });
  };

  renderMap = () => {
    switch (this.state.mapType) {
      case "Leaflet":
        return <LeafletMap switchMapEngine={this.switchMapEngine} />;
      case "MapGl":
        return <MapGlMap switchMapEngine={this.switchMapEngine} />;
      case "AMap":
        return <AMap switchMapEngine={this.switchMapEngine} />;
      case "Tencent":
        return <QMap switchMapEngine={this.switchMapEngine} />;
      case "Baidu":
        return <BaiduMap switchMapEngine={this.switchMapEngine} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div className="App">
        <Motion
          defaultStyle={{ x: -200, opacity: 0 }}
          style={{ x: spring(0), opacity: spring(1) }}
        >
          {(style) => (
            <header className="App-header" style={{ transform: `translateX(${style.x}px)`, opacity: style.opacity }}>
              <img
                src={logo}
                className="App-logo"
                alt="logo"
                onClick={this.handleClick}
              />
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
            </header>
          )}
        </Motion>
        {this.renderMap()}
      </div>
    );
  }
}

export default App;
