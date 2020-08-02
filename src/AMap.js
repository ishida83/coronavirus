import React, { Component } from "react";
// import { Map } from 'react-amap';
import Map from "react-amap/lib/map";
import InfoWindow from 'react-amap/lib/infowindow';
import Marker from "react-amap/lib/marker";
import Markers from "react-amap/lib/markers";

import gifshot from 'gifshot';

import { mapSwitcherStyle } from "./MapGlMap";
import CITIES from "./data/cities.json";

const VERSION = "1.4.0";

const plugins = [
  "MapType",
  "Scale",
  // "OverView",
  // "ControlBar", // v1.1.0 新增
  {
    name: "ToolBar",
    options: {
      visible: true, // 不设置该属性默认就是 true
      onCreated(ins) {
        console.log(ins);
      },
    },
  },
];

const styleC = (data) => ({
  background: `url(${data.image})`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: "60px",
  height: "40px",
  color: "#f0f0f0",
	fontSize: "10px",
  textAlign: "center",
	verticalAlign: "bottom",
  lineHeight: "40px",
});

const MyMapComponent = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log("组件必须作为 Map 的子组件使用");
    return;
  }
  const wrapperStyle = {
    position: "absolute",
    top: "100px",
    right: "10px",
    background: "#fff",
    padding: "5px",
    border: "1px solid #333",
  };
  const spanStyle = {
    display: "inline-block",
    height: "30px",
    lineHeight: "30px",
    width: "30px",
    textAlign: "center",
    borderRadius: "50%",
    margin: "0 5px",
    cursor: "pointer",
    background: "#333",
    color: "#fff",
    fontSize: "16px",
    border: "1px solid #333",
  };
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  const _changeMapType = (mapType) => {
    props.switchMapEngine &&
      props.switchMapEngine(mapType.nativeEvent.target.value);
  };

  return (
    <div
      style={{ ...wrapperStyle, ...mapSwitcherStyle, top: "100px" }}
      id="zoom-ctrl"
    >
      {/* <span style={spanStyle} onClick={zoomIn}>+</span>
    <span style={spanStyle} onClick={zoomOut}>-</span> */}
      <label>
        <div>
          <input
            type="radio"
            className="leaflet-control-layers-selector"
            name="leaflet-base-layers_66"
            value="Leaflet"
            onChange={_changeMapType}
          />
          <span> Leaflet</span>
        </div>
      </label>
      <label>
        <div>
          <input
            type="radio"
            className="leaflet-control-layers-selector"
            name="leaflet-base-layers_66"
            value="MapGl"
            onChange={_changeMapType}
          />
          <span> MapGl</span>
        </div>
      </label>
      <label>
        <div>
          <input
            type="radio"
            className="leaflet-control-layers-selector"
            name="leaflet-base-layers_66"
            value="AMap"
            checked="checked"
            onChange={_changeMapType}
          />
          <span> 高德</span>
        </div>
      </label>

			<label>
        <div>
          <input
            type="radio"
            className="leaflet-control-layers-selector"
            name="leaflet-base-layers_66"
            value="Google"
            onChange={_changeMapType}
          />
          <span> Google</span>
        </div>
      </label>

			<label>
        <div>
          <input
            type="radio"
            className="leaflet-control-layers-selector"
            name="leaflet-base-layers_66"
            value="Tencent"
            onChange={_changeMapType}
          />
          <span> 腾讯</span>
        </div>
      </label>
    </div>
  );
};
const getMarkers = () => (
  CITIES.map((e, idx) => ({
    position: {
      longitude: e.longitude,
      latitude: e.latitude,
    },
		image: e.image,
    myLabel: e.city,
    myIndex: idx + 1,
  }))
);

export default class AMap extends Component {
	constructor(props) {
		super(props);
		this.markers=getMarkers();
		this.markerEvents = {
      created:(allMarkers) => { 
        console.log('All Markers Instance Are Below');
        console.log(allMarkers);
      },
      click: (MapsOption, marker) => {
        console.log('MapsOptions:');
        console.log(MapsOption);
        console.log('marker:');
        console.log(marker);
      },
      mouseover:(e, marker) => {
        marker.render(this.renderMarkerOverLayout);
      },
      touchstart:(e, marker) => {
        e.target.render(this.renderMarkerOverLayout);
      },
      mouseout: (e, marker) => {
        // marker.render(this.renderMarkerLayout);
      },
      dragend: (MapsOption, marker) => { /* ... */ }
    };
		this.state = {
			center: {
        longitude: -100,
        latitude: 37.785164,
      },
    	zoom: 4.5
		};
	}
	renderMarkerLayout = (extData) => {
    return <div style={styleC(extData)}>{extData.myLabel}</div>
  }
  renderMarkerOverLayout = (extData) => {
    console.log(gifshot.VERSION);
    gifshot.createGIF({
        gifWidth: 68,
        gifHeight: 42,
        video: [
            // 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
            require('./assets/example.mp4'),
            require('./assets/example.ogv')
        ],
        interval: 0.1,
        numFrames: 30,
        frameDuration: 1,
        fontWeight: 'normal',
        fontSize: '16px',
        fontFamily: 'sans-serif',
        fontColor: '#ffffff',
        textAlign: 'center',
        textBaseline: 'bottom',
        sampleInterval: 10,
        numWorkers: 4
    }, function (obj) {
        if (!obj.error) {
            var image = obj.image, 
            animatedImage = document.createElement('img');
            animatedImage.src = image;
            document.querySelector(`[name="aMapPhoto-${extData.myLabel}"]`).src = image;
            // document.body.appendChild(animatedImage);
        }
    });
    return (
      <div>
        <img
          src={extData.image}
          name={"aMapPhoto-" + extData.myLabel}
          alt={extData.myLabel}
        />
      </div>
    );

  }
  render() {
    return (
      <Map
        amapkey={process.env.YOUR_AMAP_KEY}
        version={VERSION}
        viewMode="3D"
        center={this.state.center}
        zoom={this.state.zoom}
        plugins={plugins}
      >
        {/* <Marker position={{ longitude: 120, latitude: 34 }}>
          <div style={styleC}></div>
        </Marker> */}
        <Markers
          events={this.markerEvents}
          markers={this.markers}
          // useCluster={this.state.useCluster}
          render={this.renderMarkerLayout}
        />
        {/* <InfoWindow
          position={this.state.position}
          visible={this.state.visible}
          isCustom={false}
          content={html}
          size={this.state.size}
          offset={this.state.offset}
          events={this.windowEvents}
        /> */}
        <MyMapComponent {...this.props} />
      </Map>
    );
  }
}
