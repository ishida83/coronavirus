/* global BMap */
import React, { Component } from "react";
import {
  BaiduMap as Map,
  asyncWrapper,
  Marker,
  Circle,
  Curve,
  Ground,
  Label,
  Polygon,
  Polyline,
  MarkerClusterer,
  InfoWindow,
  CanvasLayer,
  NavigationControl,
  ScaleControl,
  MapTypeControl,
  OverviewMapControl,
  GeolocationControl,
  CopyrightControl,
  BMAP_NORMAL_MAP,
  BMAP_HYBRID_MAP
} from "react-baidu-maps";

import BaiduMarker from "./BaiduMarker";
import CITIES from "./data/cities.json";

const AsyncMap = asyncWrapper(Map);
const polygon = [
  {
    lng: 116.387112,
    lat: 39.920977
  },
  {
    lng: 116.394226,
    lat: 39.917988
  },
  {
    lng: 116.401772,
    lat: 39.921364
  },
  {
    lng: 116.41248,
    lat: 39.927893
  }
];
const MAX = 7;
const markerClusterer = [];
for (let i = 0; i < MAX; i++) {
  markerClusterer.push({
    lng: (Math.random() * 40) + 85,
    lat: (Math.random() * 30) + 21,
    imageUrl: `${process.env.REACT_APP_VIDEO_URL}/v/0${i+1}.mp4`
  });
}
const videoAttr = { 'autoplay': true, 'loop': true, 'mute': true, 'playsinline': true };


export default class BaiduMap extends React.PureComponent {
  onTilesloaded = () => {};
  onClick = (e) => {
    if (e.domEvent) {
      e.domEvent.preventDefault();
      e.domEvent.stopPropagation();
    }
    this.props.showMarkerInfo && this.props.showMarkerInfo();
  };

  _changeMapType = (mapType) => {
    this.props.switchMapEngine(mapType.value);
  };

  componentDidMount() {
    if (typeof document === "object") {
      window._changeMapType = this._changeMapType;

      fetch(`${process.env.REACT_APP_JSON_SERVER}/cities`)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        response.forEach((it) => this._renderVideos(it));
      })
			.catch((err) => {
				console.error(err);
			})

      // CITIES.forEach((it) => this._renderVideos(it));
    }
  }

  showMarkerInfo = (e, pos) => {
    this.props.showMarkerInfo && this.props.showMarkerInfo(pos);
    e.domEvent.preventDefault();
    e.domEvent.stopPropagation();
  };

  videoMarkers = CITIES.map((position, idx) => {
    position = {
      ...position,
      lat: position.lat || position.latitude,
      lng: position.lng || position.longitude,
    };
    return (
      <Marker
        position={position}
        key={idx}
        onClick={(e) => this.showMarkerInfo.call(this, e, position)}
        icon={
          position.imageUrl && {
            imageUrl: position.imageUrl,
            size: { width: 90, height: 90 },
          }
        }
      >
        {/* <InfoWindow
                content="marker infoWindow"
                offset={{ width: 0, height: -20 }}
              /> */}
      </Marker>
    );
  });

  // getMyIcon = () => {
  //   if(this.map){
  //     const BMap = this.map.getWrappedInstance().getBMap();
  //     let myIcon = new BMap.Icon("https://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
  //     return myIcon;
  //   }
  // }

  _renderVideos = (marker) => {
    const { imageUrl } = marker;
    if (
      imageUrl &&
      (imageUrl.indexOf(".mp4") !== -1 || imageUrl.indexOf(".webm") !== -1)
    ) {
      marker.ti = window.setInterval(() => {
        if (document.querySelector(`img[src="${imageUrl}"`)) {
          clearInterval(marker.ti);
          let img = document.querySelector(`img[src="${imageUrl}"`);
          let src = img.src;
          img.src = null;

          img.addEventListener("error", function (e) {
            // console.log("MP4 in image not supported. Replacing with video", e);
            let video = document.createElement("video");

            for (let key in videoAttr) {
              video.setAttribute(key, videoAttr[key]);
            }

            for (
              let imgAttr = img.attributes, len = imgAttr.length, i = 0;
              i < len;
              i++
            ) {
              video.setAttribute(imgAttr[i].name, imgAttr[i].value);
            }

            img.parentNode.insertBefore(video, img);
            img.parentNode.removeChild(img);
          });

          img.src = src;

          // const imgMP4s = Array.prototype.map.call(
          //   document.querySelectorAll(
          //     'img[src*=".mp4"]',
          //     'img[src*=".webm"]'
          //   ),
          //   (img) => {
          //     let src = img.src;
          //     img.src = null;

          //     img.addEventListener("error", function (e) {
          //       // console.log("MP4 in image not supported. Replacing with video", e);
          //       let video = document.createElement("video");

          //       for (let key in videoAttr) {
          //         video.setAttribute(key, videoAttr[key]);
          //       }

          //       for (
          //         let imgAttr = img.attributes, len = imgAttr.length, i = 0;
          //         i < len;
          //         i++
          //       ) {
          //         video.setAttribute(imgAttr[i].name, imgAttr[i].value);
          //       }

          //       img.parentNode.insertBefore(video, img);
          //       img.parentNode.removeChild(img);
          //     });

          //     img.src = src;
          //   }
          // );
        }
      }, 500);
    }
  };

  render() {
    // debugger;

    return (
      <AsyncMap
        mapUrl={`https://api.map.baidu.com/api?v=3.0&ak=${process.env.REACT_APP_BMAP_KEY}`}
        loadingElement={<div>Loading.....</div>}
        onTilesloaded={this.onTilesloaded}
        onClick={this.onClick}
        enableScrollWheelZoom={true}
        enableMapClick={false}
        heading={64.5}
        tilt={73}
        zoom={6}
        ref={(instance) => (this.map = instance)}
        mapContainer={<div style={{ height: "100%" }} />}
      >
        {/* <Marker
          position={{ lng: 116.404, lat: 39.915 }}
          icon={{
            imageUrl: "https://v.s1ar.cc/v/08.webm", // "https://lbsyun.baidu.com/jsdemo/img/fox.gif",
            size: { width: 90, height: 90 },
          }}
        >
          <InfoWindow
            content="marker infoWindow"
            offset={{ width: 0, height: -20 }}
          />
        </Marker> */}
        {/* <Circle
          center={{ lng: 116.404, lat: 39.915 }}
          radius={500}
          strokeColor="red"
          strokeWeight={2}
        />
        <Curve path={polygon} strokeWeight={2} strokeColor="red" />
        <Ground
          bounds={{
            sw: { lng: 116.424319, lat: 39.907408 },
            ne: { lng: 116.442285, lat: 39.914714 },
          }}
          imageUrl="https://lbsyun.baidu.com/jsdemo/img/si-huan.png"
        />
        <Label
          position={{ lng: 116.365139, lat: 39.916595 }}
          content="Label Demo"
          offset={{ width: 30, height: -30 }}
        />
        <Polygon path={polygon} strokeWeight={2} />
        <Polyline path={polygon} strokeWeight={2} strokeColor="green" /> */}
        {/* <MarkerClusterer> */}
        {this.videoMarkers}
        {/* </MarkerClusterer> */}
        {/* <CanvasLayer
          zIndex={10}
          update={(canvas) => {
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              return;
            }
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = "rgba(50, 50, 255, 0.7)";
            ctx.beginPath();
            const data = [
              new BMap.Point(116.297047, 39.979542), // eslint-disable-line no-undef
              new BMap.Point(116.321768, 39.88748), // eslint-disable-line no-undef
              new BMap.Point(116.494243, 39.956539), // eslint-disable-line no-undef
            ];

            for (let i = 0, len = markerClusterer.length; i < len; i++) {
              if (this.map) {
                const pixel = this.map
                  .getWrappedInstance()
                  .getBMap()
                  .pointToPixel(markerClusterer[i]);
                ctx.fillRect(pixel.x, pixel.y, 30, 30);
              }
            }
          }}
        /> */}
        <NavigationControl
          type="small"
          anchor="top_right"
          offset={{ width: 10, height: 40 }}
        />
        <ScaleControl />
        <MapTypeControl />
        <OverviewMapControl />
        <GeolocationControl
          anchor="top_right"
          offset={{ width: 10, height: 135 }}
          onLocationSuccess={(e) => {
            let address = "";
            address += e.addressComponent.province;
            address += e.addressComponent.city;
            address += e.addressComponent.district;
            address += e.addressComponent.street;
            address += e.addressComponent.streetNumber;
            console.warn(`Current Location: ${address}`);
          }}
        />
        <CopyrightControl
          anchor="top_right"
          offset={{ width: 10, height: 180 }}
          copyrights={[
            {
              id: 1,
              content: `<div href='#' style='color: #333; -moz-box-shadow: 0 0 2px rgba(0,0,0,.1); -webkit-box-shadow: 0 0 2px rgba(0,0,0,.1); box-shadow: 0 0 0 2px rgba(0,0,0,.1);border-radius: 4px; padding: 5px; backdrop-filter: blur(1px); background-color: rgba(255,255,255,0.5); font-size: 12px; font-family: "Hiragino Sans W3", Roboto;'>
                  <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="Leaflet"
                            onchange="_changeMapType(this)"
                        />
                        <span> Leaflet</span>
                    </div>
                </label>
                <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="MapGl"
                            onchange="_changeMapType(this)"
                        />
                        <span> MapGl</span>
                    </div>
                </label>
                <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="AMap"
                            onchange="_changeMapType(this)"
                        />
                        <span> 高德</span>
                    </div>
                </label>

                <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="Google"
                            onchange="_changeMapType(this)"
                        />
                        <span> Google</span>
                    </div>
                </label>

                <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="Tencent"
                            onchange="_changeMapType(this)"
                        />
                        <span> 腾讯地图</span>
                    </div>
                </label>

                <label>
                    <div>
                        <input
                            type="radio"
                            class="leaflet-control-layers-selector"
                            name="leaflet-base-layers_66"
                            value="Baidu"
                            checked="checked"
                            onchange="_changeMapType(this)"
                        />
                        <span> 百度地图</span>
                    </div>
                </label>
                </div>`,
              bounds: {
                sw: {
                  lng: -180,
                  lat: -90,
                },
                ne: {
                  lng: 180,
                  lat: 90,
                },
              },
            },
          ]}
        />
      </AsyncMap>
    );
  }
}
