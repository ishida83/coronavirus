import React, { PureComponent } from "react";
import { Marker, Popup } from "react-leaflet";

import CITIES from "./data/cities.json";
import L from "leaflet";

export const pointerIcon = (url = "./assets/pointerIcon.svg") => new L.Icon({
  iconUrl: url,
  iconRetinaUrl: url,
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [60, 40],
  shadowUrl: require("./assets/marker-shadow.png"),
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
});

export const suitcasePoint = (url = "./assets/suitcaseIcon.svg") => new L.Icon({
  iconUrl: url,
  iconRetinaUrl: url,
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [60, 40],
  shadowUrl: require("./assets/marker-shadow.png"),
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
});

export default function withMapData(MapComponent) {
  const MyPopupMarker = ({ content, position, image }) => (
    <Marker
      position={position}
      icon={content && content.indexOf(" ") !== -1 ? pointerIcon(image) : suitcasePoint(image)}
    >
      <Popup>{content}</Popup>
    </Marker>
  );

  const MyMarkersList = ({ markers }) => {
    const items = markers.map(({ key, ...props }) => (
      <MyPopupMarker key={key} {...props} />
    ));
    return <>{items}</>;
  };

  class withMapData extends PureComponent {
    constructor(props) {
      super(props);
      let markers = CITIES.map((it, idx) => {
        it.position = [it.latitude || it.lat, it.longitude || it.lng];
        it.content = it.city || ' ';
        it.image = it.image || it.imageUrl;
        it.key = it.city || idx;
        return it;
      });
      this.state = {
        markers,
      };
    }
    // state = {
    //   markers: [
    //     { key: "marker1", position: [51.5, -0.1], content: "My first popup" },
    //     { key: "marker2", position: [51.51, -0.1], content: "My second popup" },
    //     { key: "marker3", position: [51.49, -0.05], content: "My third popup" },
    //   ],
    // };
    render() {
      return (
        <MapComponent {...this.props}>
          <MyMarkersList markers={this.state.markers} />
        </MapComponent>
      );
    }
  }

  return withMapData;
}
