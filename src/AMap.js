import React, { Component } from 'react'
// import { Map } from 'react-amap';
import Map from 'react-amap/lib/map';
import Marker from 'react-amap/lib/marker';

const VERSION='1.4.0';

export default class AMap extends Component {
	render() {
		return (
			<Map amapkey={process.env.YOUR_AMAP_KEY} version={VERSION} />
		)
	}
}
