import React from 'react';
import {Marker} from 'react-map-gl';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const SIZE = 20;

const geojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        message: "Foo",
        iconSize: [60, 60],
      },
      geometry: {
        type: "Point",
        coordinates: [121.324462890625, 29.024695711685304],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "Bar",
        iconSize: [50, 50],
      },
      geometry: {
        type: "Point",
        coordinates: [119.2158203125, 31.97189158092897],
      },
    },
    {
      type: "Feature",
      properties: {
        message: "Baz",
        iconSize: [40, 40],
      },
      geometry: {
        type: "Point",
        coordinates: [120.29223632812499, 31.28151823530889],
      },
    },
  ],
};

// Important for perf: the markers never change, avoid rerender when the map viewport changes
export default class Pins extends React.PureComponent {
  render() {
    const {data, onClick} = this.props;

    return data.map((city, index) => (
      <Marker key={`marker-${index}`} longitude={city.longitude} latitude={city.latitude}>
				<div style={{backgroundImage: `url(${city.image})`,backgroundSize: 'cover', width: '60px', height: '45px', cursor: 'pointer'}}
					onClick={() => onClick(city)}
				></div>
        {/* <svg
          height={SIZE}
          viewBox="0 0 24 24"
          style={{
            cursor: 'pointer',
            fill: '#d00',
            stroke: 'none',
            transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
          }}
          onClick={() => onClick(city)}
        >
          <path d={ICON} />
        </svg> */}
      </Marker>
    ));
  }
}
