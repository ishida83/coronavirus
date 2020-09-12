import React, { PureComponent } from "react";
import { Pane, Rectangle} from 'react-leaflet';

const outer = [
  [37.505, -100.09],
  [38.505, -102.09],
]
const inner = [
  [36.505, -100.09],
  [39.505, -98.09],
]

export default function withLeafletPane(MapComponent) {
  return class PaneComponent extends PureComponent {
    state = {
      render: true,
    };

    interval;

    componentDidMount() {
      this.interval = setInterval(() => {
        this.setState({
          render: !this.state.render,
        });
      }, 5000);
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render() {
      return (
        <MapComponent>
          {this.state.render ? (
            <Pane name="cyan-rectangle" style={{ zIndex: 500 }}>
              <Rectangle bounds={outer} color="cyan" />
            </Pane>
          ) : null}
          <Pane name="yellow-rectangle" style={{ zIndex: 499 }}>
            <Rectangle bounds={inner} color="yellow" />
            <Pane name="purple-rectangle" className="purplePane-purplePane">
              <Rectangle bounds={outer} color="purple" />
            </Pane>
          </Pane>
        </MapComponent>
      );
    }
  };
}
