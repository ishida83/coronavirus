import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup, 
  LayersControl, FeatureGroup, Circle
} from 'react-leaflet';

import './LeafletMap.scss';

import withLeafletPane from './withLeafletPane';
import withLeafletMapType from './withLeafletMapType';
import withMapData from './withMapData';

export class LMap extends Component {
  state = {
    lat: 37.785164,
    lng: -100,
    zoom: 3.5
  }

  SwitchMap = (arg) => {
    // console.log(arg);
    let name;
    if(arg.name === "高德") {
      name = "AMap";
    }
    else if(arg.name === "腾讯地图") {
      name = "Tencent";
    }
    else if(arg.name === "百度地图") {
      name = "Baidu";
    }
    else name = arg.name;
    this.props.switchMapEngine &&
      this.props.switchMapEngine(name);
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    const {children, ...restProps} = this.props;
    return (
      <LeafletMap center={position} zoom={this.state.zoom} {...restProps} onBaselayerchange={this.SwitchMap}>
        <LayersControl position="topleft">
          <LayersControl.BaseLayer name="Leaflet" checked>
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="MapGl">
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="高德">
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Google">
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="腾讯地图">
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="百度地图">
            <TileLayer
              attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          {/* <LayersControl.Overlay name="Marker with popup" checked>
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LayersControl.Overlay>
          <LayersControl.Overlay name="Feature group">
            <FeatureGroup color="purple">
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
            </FeatureGroup>
          </LayersControl.Overlay> */}
        </LayersControl>
        <TileLayer
          attribution='&copy; <a href="//osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {children}
      </LeafletMap>
    );
  }
}

export default withMapData(LMap);