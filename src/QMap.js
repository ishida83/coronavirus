/* global qq */
import React, { PureComponent } from 'react'
import { QMap as Map, Overlay, HeatMap, Marker, Info, Polygon, utils, config, Circle, ControlPosition, GridHeatmap } from 'react-tmap';

import MarkerList from './QMapMarkerList';

// import heatData from './data';
import CITIES from "./data/cities.json";
import CustomerControl from './QMapControl';

import './QMap.scss';

const generalRadius = (source, r = 4) => {
    return source.map(curData => {
        const radius = +curData.population.replace(',', '') / (+curData.population.replace(',', '')) * r
        return {
            ...curData,
            radius: radius < 1 ? 1 : radius
        }
    })
}

const heatMapOptions = {
    radius: 1,
    maxOpacity: 0.8,
    useLocalExtrema: true,
    valueField: 'cnt'
}

// 默认首都
const defaultCenter = {
    lat: 37.785164,
    lng: -100
}

const roundFun = (value, n = 5) => {
    return parseFloat(value.toFixed(n))
}

class QMap extends PureComponent {
    constructor(props) {
        super(props);
        this.heatData = CITIES.map(it => {
            it.lat = it.latitude || it.lat;
            it.lng = it.longitude || it.lng;
            return it;
        })
        this.state = {
            showInfo: false,
            center: defaultCenter,
            infoPosition: defaultCenter,
            polylineVisible: true,
            // strokeDashStyle: 'solid',
            // fillColor: new qq.maps.Color(0, 110, 255, 0.2),
            // polygonPoints: [
            //     { lat: roundFun(22.53779845431509), lng: roundFun(113.93656424389837) },
            //     { lat: roundFun(22.540574807809087), lng: roundFun(113.93635769115447) },
            //     { lat: roundFun(22.542248168090907), lng: roundFun(113.93317359779837) },
            //     { lat: roundFun(22.540254259833006), lng: roundFun(113.93162700437068) },
            //     { lat: roundFun(22.538247172738405), lng: roundFun(113.93028937994002) },
            //     { lat: roundFun(22.53778185230437), lng: roundFun(113.93348019014356) }
            // ],
            // heatMapData: {
            //     max: 100,
            //     data: []
            // },
            heatData: this.heatData,
            radius: 100,
            zoom: 4,
            // gridOptions: {
            //     zIndex: 2,
            //     size: 90,
            //     width: 92,
            //     height: 100,
            //     unit: 'm',
            //     countField: 'cnt',
            //     useLocalExtrema: false,
            //     globalAlpha: 0.7,
            //     label: {
            //         show: true,
            //         fillStyle: '#fff',
            //         font: '12px Arial'
            //     }
            // }
        }
    }

    componentDidMount() {
        // const { polygonPoints } = this.state
        // setTimeout(() => {
        //     this.setState({
        //         polylineVisible: false,
        //         radius: 1000,
        //         // strokeDashStyle: 'dash',
        //         // polygonPoints: polygonPoints.map(item => ({
        //         //     lat: item.lat + 0.002,
        //         //     lng: item.lng + 0.002
        //         // })),
        //         // heatMapData: {
        //         //     max: 100,
        //         //     data: generalRadius(this.heatData)
        //         // }
        //     })
        // }, 3000)
    }

    handleMarkerClick = marker => {
        const { position } = marker
        utils.getAddressByLatLng(position).then(result => {
            const {
                detail: { nearPois, address }
            } = result
            this.setState({
                content: `${address}${nearPois[0].name}`,
            })
        })
        this.setState({
            content: '<div style="width:200px;padding-top:10px;">' +
                '<img style="float:left;" src="https://mapapi.qq.com/web/lbs/javascriptV2/demo/img/infowindow-img.jpg" load="lazy" /> ' +
                '我是个可爱的小孩子</div>',
            showInfo: true,
            infoPosition: { ...position }
        })
    }

    handleInfoClose = () => {
        this.setState({
            showInfo: false
        })
    }

    // handlePolygonChange = e => {
    //     const { path: { elems } } = e
    //     if (elems && elems.length) {
    //         this.setState({
    //             polygonPoints: e.path.elems.map(el => ({
    //                 lat: roundFun(el.lat),
    //                 lng: roundFun(el.lng)
    //             }))
    //         })
    //     }
    // }

    // handleRadiusChange = (radius, circle) => {
    //     const { map } = this.state
    //     if (map) {
    //         map.fitBounds(circle.getBounds())
    //     }
    // }

    handleMapIdle = map => {
        // console.log('map idle')
        const { gridOptions } = this.state

        this.map = map
        // this.gridHeatmap = new GridHeatmap(map, heatData, gridOptions)
    }

    handleChange = val => {
        // console.log(val)
    }

    handleEdit = () => {
        window.alert('编辑')
    }

    handleChoose = () => {
        window.alert('选择')
    }

    handleOverlayClick = () => {
        // console.log('overlay click')
    }

    _changeMapType = (arg) => {
        let name = arg.nativeEvent.target.value;
        if (name === "高德") {
            name = "AMap";
        } else if (name === "腾讯") {
            name = "Tencent";
        }
        this.props.switchMapEngine &&
            this.props.switchMapEngine(name);
    }

    render() {
        const { showInfo, center, content, infoPosition, zoom, heatMapData } = this.state;

        return (
            <Map
                center={center}
                style={{ height: '1000px' }}
                zoom={zoom}
                events={{
                    idle: this.handleMapIdle
                }}
                scaleControl={true}
                scaleControlOptions={{
                    position: qq.maps.ControlPosition.BOTTOM_RIGHT
                }}
            >
                {/* <Marker
                    position={this.heatData[0]}
                    draggable={true}
                    visible
                    // decoration="10"
                    size="60, 40"
                    icon={this.heatData[0].image}
                    animation={config.ANIMATION_DROP}
                    events={{
                        click: this.handleMarkerClick
                    }}
                /> */}
                <MarkerList size={60} animation={config.ANIMATION_DROP} data={this.heatData} icons={this.heatData.map(it=>it.image)} events={{
                    click: this.handleMarkerClick
                }} visible={true} />
                <Info content={content} visible={showInfo} position={infoPosition} events={{
                    closeclick: () => this.handleInfoClose()
                }} />
                {/* <HeatMap heatData={heatMapData} options={heatMapOptions} /> */}
                <CustomerControl
                    position={ControlPosition.LEFT_TOP}
                    style={{
                        zIndex: 999,
                        textAlign: 'left',
                        fontSize: '10px',
                        fontFamily: 'Roboto, "Hiragino Sans W3"',

                        padding: "5px",
                        color: "#333",
                        MozBoxShadow: "0 0 2px rgba(0,0,0,.1)",
                        WebkitBoxShadow: "0 0 2px rgba(0,0,0,.1)",
                        boxShadow: "0 0 0 2px rgba(0,0,0,.1)",
                        borderRadius: "4px",
                        backdropFilter: "blur(1px)",
                        backgroundColor: "rgba(255,255,255,0.5)",
                        marginTop: "70px"
                    }}
                    _changeMapType={this._changeMapType}
                    onEdit={this.handleEdit}
                    onChoose={this.handleChoose}
                />
                {/* <Polygon fillColor={fillColor} visible points={polygonPoints} strokeDashStyle={strokeDashStyle} editable draggable events={{
                    adjustNode: e => this.handlePolygonChange(e),
                    removeNode: e => this.handlePolygonChange(e),
                    insertNode: e => this.handlePolygonChange(e)
                }} /> */}
                {/* <Circle center={center} radius={radius} strokeColor="#666" strokeDashStyle="dash" strokeWeight={2} events={{
                    radius_changed: (circle, e) => this.handleRadiusChange(radius, circle, e)
                }} /> */}
                {/* <Overlay
            position={{
              lat: 22.54073,
              lng: 113.933571
            }}
            offset={{
              x: 20,
              y: 0
            }}
            style={{
              backgroundColor: 'green'
            }}
          >
            <div className="overlay" onClick={this.handleOverlayClick}>这是自定义 overlay</div>
          </Overlay>
           */}

            </Map>
        )
    }
}

export default QMap
