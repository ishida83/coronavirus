import React from "react";
// import BMap from "BMap";


function loadScript() {  
  var script = document.createElement("script");  
  script.src = "http://api.map.baidu.com/api?v=2.0&ak=LUPp8TUL59Vq3bmEIOIfbT93";
  document.body.appendChild(script);
}

export default class BaiduMap extends React.Component {
  feedData = (BMap, mp, points = []) => {
    let addMarker = (point, index) => {
      var marker = new BMap.Marker(point);
			marker.addEventListener("click", function() {
				var opts = {
          width: 250, // 信息窗口宽度
          height: 100, // 信息窗口高度
          title: "Hello" // 信息窗口标题
        };
        var infoWindow = new BMap.InfoWindow("World", opts); // 创建信息窗口对象
        mp.openInfoWindow(infoWindow, marker.point);   
      });  
      mp.addOverlay(marker);
    };
    let bounds = mp.getBounds();
    let lngSpan = bounds.Ge - bounds.Le;
    let latSpan = bounds.Wd - bounds.Yd;
    if (points.length <= 0) {
      for (let i = 0; i < 10; i++) {
        let point = new BMap.Point(
          bounds.Le + lngSpan * (Math.random() * 0.7 + 0.15),
          bounds.Yd + latSpan * (Math.random() * 0.7 + 0.15)
        );
        points.push(point);
      }
    }
    for (let i of points) {
      addMarker(i);
    }
  };
  componentDidMount() {
    if (window.BMap) {
      let BMap = window.BMap;
      let mp = new BMap.Map("allmap", {
        enableBizAuthLogo: false
      });
      let geolocation = new BMap.Geolocation();
      let myCity = new BMap.LocalCity();

      mp.centerAndZoom(new BMap.Point(121.491, 31.233), 11);
      mp.addOverlay(new BMap.Marker(new BMap.Point(121.491, 31.233)));
      mp.enableScrollWheelZoom(true);
      mp.addControl(
        new BMap.NavigationControl({
          type: window.BMAP_NAVIGATION_CONTROL_ZOOM
        })
      );

      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() === window.BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          mp.addOverlay(mk);
          mp.panTo(r.point);
          // alert("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          // alert("failed" + this.getStatus());
        }
      });

      myCity.get(result => {
        var cityName = result.name;
        // mp.setCenter(cityName);
        // alert("当前定位城市:" + cityName);
      });
      // mp.addControl(new BMap.NavigationControl());
      // mp.addControl(new BMap.ScaleControl());
      // mp.addControl(new BMap.OverviewMapControl());
      // mp.addControl(new BMap.MapTypeControl());

      this.feedData(BMap, mp);
    } else if (!navigator.onLine) {
      let t = setInterval(()=> {
        if(navigator.onLine) {
          t && clearInterval(t);
          // loadScript();
          setTimeout(() => {
            // this.forceUpdate();
            window.location.reload();
          }, 1000);
        }
      }, 1000);
    }
    // this.loadScript();
  }
  render() {
    return (
      <div
        id="allmap"
        style={{
          width: "100vw",
          height: "calc(100vh - 100px)"
        }}
      ></div>
    );
  }
}
