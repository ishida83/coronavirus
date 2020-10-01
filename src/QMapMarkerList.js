/* global qq */
import React from "react";
import PropTypes from "prop-types";
import { Marker, config } from "react-tmap";

export default class MarkerList extends React.PureComponent {
  static defaultProps = {
    data: [],
    animation: config.ANIMATION_DROP,
    showDecoration: true,
  };

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      })
    ),
  };

  render() {
    const { data, showDecoration, icons, ...rest } = this.props;
    return data.map((item, i) => {
      const options = { ...rest };
      options.position = item;
      if (showDecoration) {
        options.decoration = item.decoration ? item.decoration : i + 1;
      }
      if (icons) {
        var anchor = new qq.maps.Point(34, 0),
          size = new qq.maps.Size(68, 42),
          origin = new qq.maps.Point(0, 0),
          markerIcon = new qq.maps.MarkerImage(
            icons[i],
            size,
            origin,
            anchor
          );
        options.icon = markerIcon; // icons[i];
      }
      return <Marker key={i} {...options} />;
    });
  }
}
