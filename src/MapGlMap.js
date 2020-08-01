import React, { Component } from "react";
import MapGL, {Popup, Marker, NavigationControl, ScaleControl, FullscreenControl, GeolocateControl} from "react-map-gl";

import Pins from './pins';
import CityInfo from './city-info';
import CITIES from './data/cities.json';
import VideoPlayer from './VideoPlayer';

const geolocateStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const navStyle = {
  position: 'absolute',
  top: 72,
  left: 0,
  padding: '10px'
};

const scaleControlStyle = {
  position: 'absolute',
  bottom: 36,
  left: 0,
  padding: '10px'
};

export const mapSwitcherStyle = {
  textAlign: "left",
  fontSize: "12px",
  fontFamily: "'Hiragino Sans W3', Roboto",
  top: "170px",
};

export default class MapGlMap extends Component {
  state = {
		viewport: {
			latitude: 37.785164,
			longitude: -100,
			bearing: 0,
			pitch: 0,
      zoom: 3.5,
      localIdeographFontFamily: "'Noto Sans', 'Noto Sans CJK SC', sans-serif"
		},
		popupInfo: null
  }

  _updateViewport = viewport => {
    this.setState({viewport});
  };

  _onClickMarker = city => {
    this.setState({popupInfo: city});
  };

  _changeMapType = (mapType) => {
    // console.log(this, mapType);
    this.props.switchMapEngine(mapType.nativeEvent.target.value);
  }

  _renderMapSwitcher = () => {
    // copy from mapbox
    return (
      <div className="mapboxgl-ctrl-top-left" style={mapSwitcherStyle}>
        <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
          <label>
            <div>
              <input type="radio" className="leaflet-control-layers-selector" name="leaflet-base-layers_66" value="Leaflet" onChange={this._changeMapType}/>
              <span> Leaflet</span>
            </div>
          </label>
          <label>
            <div>
              <input type="radio" className="leaflet-control-layers-selector" name="leaflet-base-layers_66" value="MapGl" checked="checked" onChange={this._changeMapType} />
              <span> MapGl</span>
            </div>
          </label>
          <label>
            <div>
              <input type="radio" className="leaflet-control-layers-selector" name="leaflet-base-layers_66" value="AMap" onChange={this._changeMapType} />
              <span> 高德</span>
            </div>
          </label>

          <label>
            <div>
              <input type="radio" className="leaflet-control-layers-selector" name="leaflet-base-layers_66" value="Google" onChange={this._changeMapType} />
              <span> Google</span>
            </div>
          </label>
          <label>
            <div>
              <input type="radio" className="leaflet-control-layers-selector" name="leaflet-base-layers_66" value="Tencent" onChange={this._changeMapType} />
              <span> 腾讯</span>
            </div>
          </label>
          {/* <button
            className="mapbox-gl-draw_ctrl-draw-btn mapbox-gl-draw_trash"
            title="Delete"
            onClick={this._onDelete}
          /> */}
        </div>
      </div>
    );
  };

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          offsetLeft={30}
          offsetTop={50}
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          {/* <CityInfo info={popupInfo} /> */}
					{/* <video className="video-react-video" preload="auto" playsInline={true} src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" tabIndex="-1" crossOrigin="anonymous" style={{width: 200, height: 150}}></video> */}
          <VideoPlayer />
        </Popup>
      )
    );
  }

  render() {
    const {viewport} = this.state;

    return (
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        // mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <Pins data={CITIES} onClick={this._onClickMarker} />

        {this._renderPopup()}

        {this._renderMapSwitcher()}

        <div style={geolocateStyle}>
          <GeolocateControl />
        </div>
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>

      </MapGL>
    );
  }
}