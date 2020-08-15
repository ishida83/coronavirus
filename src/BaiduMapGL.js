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
  CopyrightControl
} from "react-baidu-maps";

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
const MAX = 30;
const markerClusterer = [];
for (let i = 0; i < MAX; i++) {
  markerClusterer.push({
    lng: (Math.random() * 40) + 85,
    lat: (Math.random() * 30) + 21
  });
}


export default class BaiduMapGL extends Component {
  onTilesloaded = () => {

  }
  onClick = () => {

  }

  _changeMapType = (mapType) => {
    this.props.switchMapEngine(mapType.value);
  }

  componentDidMount() {
    if (typeof document === 'object') {
      window._changeMapType = this._changeMapType;

      if(!window.BMapGL) {
        document.querySelector('[src*="//api.map.baidu.com/api?v=1.0&type=webgl&ak="]').addEventListener('load', () => {
          window.BMap = window.BMapGL;
        });
      } else {
        window.BMap = window.BMapGL;
      }
    }
  }

  // getMyIcon = () => {
  //   if(this.map){
  //     const BMap = this.map.getWrappedInstance().getBMap();
  //     let myIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
  //     return myIcon;
  //   }
  // }

  render() {
    // debugger;

    return (
      <AsyncMap
        mapUrl={`//api.map.baidu.com/api?v=1.0&type=webgl&ak=${process.env.REACT_APP_BMAP_KEY}`}
        loadingElement={<div>Loading.....</div>}
        onTilesloaded={this.onTilesloaded}
        onClick={this.onClick}
        ref={(instance) => (this.map = instance)}
        enableScrollWheelZoom={true}
        heading={64.5}
        tilt={73}
        mapContainer={<div style={{ height: "100%" }} />}
      >
        <Marker
          position={{ lng: 116.404, lat: 39.915 }}
          icon={{
            imageUrl: "//lbsyun.baidu.com/jsdemo/img/fox.gif",
            size: { width: 300, height: 157 },
          }}
        >
          <InfoWindow
            content="marker infoWindow"
            offset={{ width: 0, height: -20 }}
          />
        </Marker>
        <Circle
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
          imageUrl="//lbsyun.baidu.com/jsdemo/img/si-huan.png"
        />
        <Label
          position={{ lng: 116.365139, lat: 39.916595 }}
          content="Label Demo"
          offset={{ width: 30, height: -30 }}
        />
        <Polygon path={polygon} strokeWeight={2} />
        <Polyline path={polygon} strokeWeight={2} strokeColor="green" />
        <MarkerClusterer>
          {markerClusterer.map((position) => (
            <Marker position={position} />
          ))}
        </MarkerClusterer>
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
            
            for (let i = 0, len = data.length; i < len; i++) {
              if (this.map) {
                const pixel = this.map
                  .getWrappedInstance()
                  .getBMap().pointToPixel(data[i]);
                ctx.fillRect(pixel.x, pixel.y, 30, 30);
              }
            }
          }}
        /> */}
        <NavigationControl
          type="small"
          anchor="top_right"
          offset={{ width: 0, height: 150 }}
          // offset={{ width: 10, height: 40 }}
        />
        <ScaleControl />
        <MapTypeControl />
        {/* <OverviewMapControl /> */}
        {/* <GeolocationControl
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
        /> */}
        {/* <CopyrightControl
          anchor="top_right"
          offset={{ width: 10, height: 180 }}
          copyrights={[
            {
              id: 1,
              content:
                `<div href='#' style='-moz-box-shadow: 0 0 2px rgba(0,0,0,.1); -webkit-box-shadow: 0 0 2px rgba(0,0,0,.1); box-shadow: 0 0 0 2px rgba(0,0,0,.1);border-radius: 4px; padding: 5px; background: #fff; font-size: 12px; font-family: "Hiragino Sans W3", Roboto;'>
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
                  lng: 116.055026,
                  lat: 39.591042,
                },
                ne: {
                  lng: 116.752974,
                  lat: 40.237421,
                },
              },
            },
          ]}
        /> */}
      </AsyncMap>
    );
  }
}
