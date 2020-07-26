import React, { Component } from "react";
import MapGL, {Popup, Marker, NavigationControl, ScaleControl, FullscreenControl, GeolocateControl} from "react-map-gl";

import Pins from './pins';
import CityInfo from './city-info';
import CITIES from './data/cities.json';

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

  _renderPopup() {
    const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.longitude}
          latitude={popupInfo.latitude}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          {/* <CityInfo info={popupInfo} /> */}
					<video class="video-react-video" preload="auto" playsinline="" poster="/assets/poster.png" src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4" tabindex="-1"></video>
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
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._updateViewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        <Pins data={CITIES} onClick={this._onClickMarker} />

        {this._renderPopup()}

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