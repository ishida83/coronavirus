import React from 'react';
import { ControlPosition, Control } from 'react-tmap';

export default class CustomControl extends Control {
  static defaultProps = {
    position: ControlPosition.TOP_CENTER,
    style: {},
    onEdit: () => {},
    onChoose: () => {}
  }

  render () {
    const { style, onEdit, onChoose, _changeMapType } = this.props
    return (
      <div ref={node => (this.controlNode = node)} style={style}>
        <div className="tools">
          {/* <button className="tc-15-btn weak" onClick={onEdit}><i className="icon-pen" />编辑</button>
          <button className="tc-15-btn weak selected" onClick={onChoose}><i className="icon-pointer" />选择</button> */}
        </div>
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
                    defaultChecked="checked"
                    onChange={_changeMapType}
                />
                <span> 腾讯</span>
            </div>
        </label>
      </div>
    )
  }
}
