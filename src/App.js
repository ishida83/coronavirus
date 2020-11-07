// @flow
import React from "react";
import { Motion, spring } from "react-motion";
import PropTypes from "prop-types";
import { Capacitor, Plugins } from "@capacitor/core";

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
import {Snackbar} from '@material/react-snackbar';

import { motion, AnimatePresence } from "framer-motion";

import logo from "./logo.svg";
import "./App.scss";

import LeafletMap from "./LeafletMap";
import MapGlMap from "./MapGlMap";
import AMap from "./AMap";
import QMap from "./QMap";
import BaiduMap from "./BaiduMap";

import Player from "./Player";

import Hammer from 'react-hammerjs';


const { Share } = Plugins;

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

const checkOnlineStatus = async () => {
  try {
    const online = await fetch("./logo192.png");
    return online.status >= 200 && online.status < 300; // either true or false
  } catch (err) {
    return false; // definitely offline
  }
};

class App extends React.PureComponent {
  state = {
    mapType: Capacitor.isNative ? "Leaflet" : "Baidu",
    video: null,
    showMarkerInfo: false,
    deeplink: null,
    hoverAppBar: false,
    selectedIndex: 0,
    snackbarMessage: '',
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
    this.showMarkerInfo();
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

  refreshWindow = () => {
    if(typeof window !== 'undefined'){
      window.location.reload();
    }
  };

  shareIt = async () => {
    const canonicalElement = document?.querySelector("link[rel=canonical]");
    let url = document?.location?.href;
    if (canonicalElement !== null) {
      url = canonicalElement?.href;
    }
    const opts = {
      title: "Magic Map",
      text: "可以分享视频音乐的神奇地图！",
      url: url || process.env.PUBLIC_URL,
      dialogTitle: "分享给我的朋友",
    };
    if (navigator.share) {
      navigator
        .share(opts)
        .then(() => console.log("Successful share"))
        .catch((error) => {
          console.log("Error sharing", error);
        });
    } else {
      try {
        let shareRet = await Share.share(opts);
      } catch (error) {
        console.log("Error sharing", error);
      }
    }
  };

  hintOnlineStatus = () => {
    return (
      this.state.snackbarMessage && <Snackbar
        onClose={()=>this.setState({snackbarMessage: null})}
        message={this.state.snackbarMessage}
        actionText="确认"
      />
    );
  };

  toggleOnlineStatus = (status) => {
    this.setState({
      snackbarMessage: status === 'online' ? '网络已恢复' : '你已离线，请稍后重拾'
    });
  }

  componentDidMount() {
    if (typeof window !== "undefined") {
      // this.onlineTimer = window.setInterval(async () => {
      //   const result = await checkOnlineStatus();
      //   console.log(result);
      // }, 3000);
      window.addEventListener("offline", this.toggleOnlineStatus.bind(this, "offline"));
      window.addEventListener("online", this.toggleOnlineStatus.bind(this, "online"));
    }
  }

  componentWillUnmount() {
    if(typeof window !== 'undefined'){
      // window.removeInterval(this.onlineTimer);
      window.removeEventListener("offline", this.toggleOnlineStatus);
      window.removeEventListener("online", this.toggleOnlineStatus);
    }
  }

  handleSwipe = (e) => {
    this.toggleHoverAppBar();
  }

  render() {
    const { isLandscape, isPortrait } = this.props;
    return (
      <div className="drawer-container">
        <Drawer dismissible open={this.state.hoverAppBar}>
          {/* <Hammer onSwipe={this.handleSwipe}>
          <div> */}
          <DrawerHeader>
            <DrawerTitle tag="h2">{/* jane.smith@gmail.com */}</DrawerTitle>
          </DrawerHeader>

          <DrawerContent>
              <List
                singleSelection
                avatarList
                selectedIndex={this.state.selectedIndex}
              >
                {/* <ListItem>
                  <ListItemGraphic graphic={<MaterialIcon icon="folder" />} />
                  <ListItemText primaryText="首页" />
                </ListItem> */}

                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/01.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/02.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/03.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/04.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/05.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/06.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/07.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/08.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/08.webm`}
                            type="video/webm"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/01.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/02.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/03.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/04.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/05.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/06.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/07.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/08.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/08.webm`}
                            type="video/webm"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/01.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/02.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/03.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/04.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/05.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/06.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/07.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemGraphic
                    graphic={
                      <>
                        <video autoPlay loop muted playsInline>
                          <source
                            src={`${process.env.REACT_APP_VIDEO_URL}/v/08.mp4`}
                            type="video/mp4"
                          />
                        </video>
                      </>
                    }
                  />
                </ListItem>
                <ListItem>
                <ListItemGraphic
                  graphic={
                    <>
                      <video autoPlay loop muted playsInline>
                        <source
                          src={`${process.env.REACT_APP_VIDEO_URL}/v/08.webm`}
                          type="video/webm"
                        />
                      </video>
                    </>
                  }
                />
              </ListItem>
              </List>
          </DrawerContent>
          {/* </div>
          </Hammer> */}
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
                <TopAppBarIcon actionItem tabIndex={1}>
                  <MaterialIcon
                    aria-label="refresh page"
                    hasRipple
                    icon="refresh"
                    onClick={this.refreshWindow}
                  />
                </TopAppBarIcon>

                {isMobile && <TopAppBarIcon actionItem tabIndex={0}>
                  <MaterialIcon
                    aria-label="share page"
                    hasRipple
                    icon="share"
                    onClick={this.shareIt}
                  />
                </TopAppBarIcon>}
              </TopAppBarSection>
            </TopAppBarRow>
          </TopAppBar>
          <TopAppBarFixedAdjust>
            {this.hintOnlineStatus()}
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
