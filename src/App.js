// @flow
import React from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import { Capacitor } from "@capacitor/core";

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
import IconButton from "@material/react-icon-button";
import MaterialIcon from "@material/react-material-icon";
import Drawer, {
  DrawerAppContent,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@material/react-drawer";
import List, {
  ListItem,
  ListItemGraphic,
  ListItemText,
} from "@material/react-list";

import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from "@material/react-top-app-bar";

import { motion, AnimatePresence } from "framer-motion";

import logo from "./logo.svg";
import "./App.scss";

import LeafletMap from "./LeafletMap";
import MapGlMap from "./MapGlMap";
import AMap from "./AMap";
import QMap from "./QMap";
import BaiduMap from "./BaiduMap";

import Player from "./Player";

const sidePanelStyle = {
  position: "fixed",
  width: "50%",
  height: "100vh",
  zIndex: 1,
  alignItems: "center",
  display: "flex",
  pointerEvents: "none",
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
  if (document.querySelector(`iframe[src*="${props.deeplink}"]`)) {
  } else {
    let iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.style.width = "0";
    iframe.style.height = "0";

    iframe.src = props.deeplink;
    document.body.appendChild(iframe);
  }
  return null;
};

InvokeApp.propTypes = {
  deeplink: PropTypes.string,
};

class App extends React.Component {
  state = {
    mapType: Capacitor.isNative ? "Leaflet" : "Baidu",
    video: null,
    showMarkerInfo: false,
    deeplink: null,
    hoverAppBar: false,
    selectedIndex: 0,
  };
  static propTypes = {
    isLandscape: PropTypes.bool,
    isPortrait: PropTypes.bool,
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

  toggleHoverAppBar = () => {
    this.setState({
      hoverAppBar: !this.state.hoverAppBar,
    });
  };

  render() {
    const { isLandscape, isPortrait } = this.props;
    return (
      <div className="drawer-container">
        <Drawer
          dismissible
          // open={this.state.hoverAppBar}
        >
          <DrawerHeader>
            <DrawerTitle tag="h2">{/* jane.smith@gmail.com */}</DrawerTitle>
          </DrawerHeader>

          <DrawerContent>
            <List singleSelection selectedIndex={this.state.selectedIndex}>
              <ListItem>
                <ListItemGraphic graphic={<MaterialIcon icon="folder" />} />
                <ListItemText primaryText="首页" />
              </ListItem>
            </List>
          </DrawerContent>
        </Drawer>

        <DrawerAppContent className="drawer-app-content">
          <TopAppBar shortCollapsed={!this.state.hoverAppBar}>
            <TopAppBarRow>
              <TopAppBarSection align="start">
                <TopAppBarIcon navIcon tabIndex={0}>
                  <MaterialIcon
                    hasRipple
                    icon="menu"
                    onClick={this.toggleHoverAppBar}
                  />
                </TopAppBarIcon>
                <TopAppBarTitle>Magic Map</TopAppBarTitle>
              </TopAppBarSection>
              <TopAppBarSection align="end" role="toolbar">
                <TopAppBarIcon actionItem tabIndex={0}>
                  <MaterialIcon
                    aria-label="share page"
                    hasRipple
                    icon="share"
                    onClick={() => console.log("share")}
                  />
                </TopAppBarIcon>
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust>
            <div className="App">
              <BrowserView>
                <Player isToggled={this.state.showMarkerInfo}>
                  <Card
                    className="mdc-card demo-card"
                    style={{
                      flex: 1,
                      pointerEvents: "auto",
                      width: "80vw",
                      height: "auto",
                    }}
                  >
                    <CardPrimaryContent className="demo-card__primary-action">
                      <CardMedia
                        wide
                        className="demo-card__media"
                        dangerouslySetInnerHTML={{
                          __html: this.state.video,
                        }}
                      />
                    </CardPrimaryContent>

                    <CardActions>
                      <CardActionIcons>
                        <a
                          href={this.state.deeplink || process.env.PUBLIC_URL}
                          title="直达链接"
                        >
                          <IconButton>
                            <MaterialIcon icon="launch" />
                          </IconButton>
                        </a>
                        <IconButton>
                          <MaterialIcon icon="share" />
                        </IconButton>
                      </CardActionIcons>
                    </CardActions>
                  </Card>
                </Player>
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
                    >
                      <Card style={{ height: "100%", pointerEvents: "auto" }}>
                        <p
                          style={{ flex: 1 }}
                          dangerouslySetInnerHTML={{
                            __html: this.state.video,
                          }}
                        ></p>

                        <CardActions>
                          <CardActionIcons>
                            <a
                              href={
                                this.state.deeplink || process.env.PUBLIC_URL
                              }
                              title="直达链接"
                            >
                              <IconButton>
                                <MaterialIcon icon="launch" />
                              </IconButton>
                            </a>
                            <IconButton>
                              <MaterialIcon icon="share" />
                            </IconButton>
                          </CardActionIcons>
                          {this.state.deeplink && (
                            <InvokeApp deeplink={this.state.deeplink} />
                          )}
                        </CardActions>
                      </Card>
                    </motion.aside>
                  )}
                </Motion>
              </MobileView>
              {this.renderMap()}
            </div>
          </TopAppBarFixedAdjust>
        </DrawerAppContent>
      </div>
    );
  }
}

export default withOrientationChange(App);
