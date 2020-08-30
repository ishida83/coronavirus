// @flow
import React from "react";
import { Motion, spring } from "react-motion";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  withOrientationChange,
} from "react-device-detect";

import Card, {
  CardPrimaryContent,
  CardMedia,
  CardActions,
  CardActionButtons,
  CardActionIcons,
} from "@material/react-card";
import Button from "@material/react-button";

import { motion, AnimatePresence } from 'framer-motion';

import logo from "./logo.svg";
import "./App.scss";

import LeafletMap from "./LeafletMap";
import MapGlMap from "./MapGlMap";
import AMap from "./AMap";
import QMap from "./QMap";
import BaiduMap from "./BaiduMap";

const sidePanelStyle = {
  position: "fixed",
  width: "50%",
  height: "100vh",
  zIndex: 1,
  alignItems: 'center',
  display: 'flex',
  pointerEvents: 'none'
  // backgroundColor: "white",
};

const sidePanelMobileStyle = {
  position: "fixed",
  height: "50vh",
  width: "100%",
  zIndex: 1,
  bottom: 0,
  // backgroundColor: "white",
};

const InvokeApp = (props) => {
  if(document.querySelector(`iframe[src*="${props.deeplink}"]`)) {

  } else {
    let iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.style.width = 0;
    iframe.style.height = 0;

    iframe.src = props.deeplink;
    document.body.appendChild(iframe);
  }
  return null;
}

class App extends React.Component {
  state = {
    mapType: "Baidu",
    video: null,
    showMarkerInfo: false,
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

  showMarkerInfo = (e) => {
    console.log(e);
    this.setState({
      video: e?.videoUrl,
      deeplink: e?.deeplink,
      showMarkerInfo: !!e?.videoUrl,
    });
  };

  renderMap = () => {
    let props = {
      switchMapEngine: this.switchMapEngine,
      showMarkerInfo: this.showMarkerInfo,
    };
    switch (this.state.mapType) {
      case "Leaflet":
        return <LeafletMap {...props} />;
      case "MapGl":
        return <MapGlMap {...props} />;
      case "AMap":
        return <AMap {...props} />;
      case "Tencent":
        return <QMap {...props} />;
      case "Baidu":
        return <BaiduMap {...props} />;
      default:
        return null;
    }
  };

  render() {
    const { isLandscape, isPortrait } = this.props;
    return (
      <div className="App">
        {/* <Motion
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
        </Motion> */}
        <BrowserView>
          <Motion
            defaultStyle={{ x: -100, opacity: 0 }}
            style={{
              x: spring(this.state.showMarkerInfo ? 0 : -100),
              opacity: spring(this.state.showMarkerInfo ? 1 : 0),
            }}
          >
            {(style) => (
              <aside
                style={{
                  ...sidePanelStyle,
                  transform: `translateX(${style.x}%)`,
                  opacity: style.opacity,
                }}
              >
                <Card style={{flex: 1, pointerEvents: 'auto'}}>
                  {/* <CardPrimaryContent>
                    <h1>Header</h1>
                    <CardMedia square imageUrl={require("./logo.svg")}>
                      <span>Fancy Image</span>
                    </CardMedia>
                  </CardPrimaryContent> */}

                  {/* <h1>Title</h1> */}
                  <p
                    style={{height: '50vh'}}
                    dangerouslySetInnerHTML={{
                      __html: this.state.video,
                    }}
                  ></p>

                  <CardActions>
                    <CardActionButtons>
                      <Button outlined><a href={this.state.deeplink || process.env.PUBLIC_URL}>直达链接</a></Button>
                    </CardActionButtons>

                    {/* <CardActionIcons>
                      <i>Click Me Too!</i>
                    </CardActionIcons> */}
                  </CardActions>
                </Card>

              </aside>
            )}
          </Motion>
        </BrowserView>
        <MobileView>
          <Motion
            defaultStyle={{ y: 100, opacity: 0 }}
            style={{
              y: spring(this.state.showMarkerInfo ? 0 : 100),
              opacity: spring(this.state.showMarkerInfo ? 1 : 0),
            }}
          >
            {(style) => (
              <motion.aside
                style={{
                  ...sidePanelMobileStyle,
                  transform: `translateY(${style.y}%)`,
                  opacity: style.opacity,
                }}
                // dangerouslySetInnerHTML={{
                //   __html: this.state.video,
                // }}
              >

                <Card style={{height: '100%'}}>
                  <p
                    style={{flex: 1}}
                    dangerouslySetInnerHTML={{
                      __html: this.state.video,
                    }}
                  ></p>

                  <CardActions>
                    <CardActionButtons>
                      <Button outlined><a href={this.state.deeplink || process.env.PUBLIC_URL}>直达链接</a></Button>
                    </CardActionButtons>
                    {this.state.deeplink && <InvokeApp deeplink={this.state.deeplink} />}

                  </CardActions>
                </Card>
              </motion.aside>
            )}
          </Motion>
        </MobileView>
        {this.renderMap()}
      </div>
    );
  }
}

export default withOrientationChange(App);
