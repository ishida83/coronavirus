import React from "react";

export default function withLeafletMapType(MapComponent) {
  return class componentName extends React.Component {
    state = {
      animate: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
    };

    handleClick = (e) => {
      this.setState({
        latlng: e.latlng,
      });
    };

    toggleAnimate = () => {
      this.setState({
        animate: !this.state.animate,
      });
    };

    render() {
      return (
        <div style={{ textAlign: "center" }}>
          <label>
            <input
              checked={this.state.animate}
              onChange={this.toggleAnimate}
              type="checkbox"
            />
            Animate panning
          </label>
          <MapComponent {...this.props} onClick={this.handleClick} animate={this.state.animate} center={this.state.latlng}/>
        </div>
      );
    }
  };
}
