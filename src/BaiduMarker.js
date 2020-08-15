import React from 'react';
import PropTypes from 'prop-types';
import wrapClass from 'react-baidu-maps/lib/utils/wrapClass';
import {MAP, MARKER_CLUSTERER, MARKER} from 'react-baidu-maps/lib/utils/constants';
import {Point, Size, Icon, Label} from 'react-baidu-maps/lib/utils/MapPropTypes';
import {getMarkerAnimation, toBMapPoint, toBMapSize, toBMapIcon, toBMapLabel} from 'react-baidu-maps/lib/utils/typeTransform';

/**
 * Marker
 * @author terencewu
 */

const controlledPropTypes = {
  position: PropTypes.shape(Point),
  icon: PropTypes.shape(Icon),
  offset: PropTypes.shape(Size),
  label: PropTypes.shape(Label),
  title: PropTypes.string,
  onTop: PropTypes.bool,
  enableDragging: PropTypes.bool,
  enableMassClear: PropTypes.bool,
  zIndex: PropTypes.number,
  animation: PropTypes.oneOf(['drop', 'bounce']),
  rotation: PropTypes.number,
  shadow: PropTypes.shape(Icon)
};

const controlledPropUpdater = {
  position(obj, arg) { obj.setPosition(toBMapPoint(arg)); },
  icon(obj, arg) { obj.setIcon(toBMapIcon(arg)); },
  offset(obj, arg) { obj.setOffset(toBMapSize(arg)); },
  label(obj, arg) { obj.setLabel(toBMapLabel(arg)); },
  title(obj, arg) { obj.setTitle(arg); },
  onTop(obj, arg) { obj.setTop(arg); },
  enableDragging(obj, arg) { if (arg) obj.enableDragging(); else obj.disableDragging(); },
  enableMassClear(obj, arg) { if (arg) obj.enableMassClear(); else obj.disableMassClear(); },
  zIndex(obj, arg) { obj.setZIndex(arg); },
  animation(obj, arg) { obj.setAnimation(getMarkerAnimation(arg)); },
  rotation(obj, arg) { obj.setRotation(arg); },
  shadow(obj, arg) { obj.setShadow(toBMapIcon(arg)); }
};

const publicMethodMap = [
  'openInfoWindow',
  'closeInfoWindow',
  'getIcon',
  'getPosition',
  'getOffset',
  'getLabel',
  'getTitle',
  'getMap',
  'addContextMenu',
  'removeContextMenu',
  'setAnimation',
  'getRotation',
  'getShadow',
  'show',
  'hide'
];

const eventMap = [
  'click',
  'dblclick',
  'mousedown',
  'mouseup',
  'mouseout',
  'mouseover',
  'remove',
  'infowindowclose',
  'infowindowopen',
  'dragstart',
  'dragging',
  'dragend',
  'rightclick'
];

const videoAttr = { 'autoplay': true, 'loop': true, 'mute': true, 'playsinline': true };

class Marker extends React.Component {
  static propTypes = {
    [MAP]: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
    [MARKER_CLUSTERER]: PropTypes.object // eslint-disable-line react/no-unused-prop-types
  };

  getInstanceFromComponent(component) {
    return component.marker;
  }

  _renderVideos = (marker) => {
      const {imageUrl} = marker;
      if(imageUrl && (imageUrl.indexOf('.mp4') !== -1 || imageUrl.indexOf('.webm') !== -1)) {
        marker.ti = window.setInterval(() => {
          if(document.querySelector(`img[src="${imageUrl}"`)){
            clearInterval(marker.ti);
            let img = document.querySelector(`img[src="${imageUrl}"`);
            let src = img.src;
            img.src = null;

            img.addEventListener("error", function (e) {
              // console.log("MP4 in image not supported. Replacing with video", e);
              let video = document.createElement("video");

              for (let key in videoAttr) {
                video.setAttribute(key, videoAttr[key]);
              }

              for (
                let imgAttr = img.attributes, len = imgAttr.length, i = 0;
                i < len;
                i++
              ) {
                video.setAttribute(imgAttr[i].name, imgAttr[i].value);
              }

              img.parentNode.insertBefore(video, img);
              img.parentNode.removeChild(img);
            });

            img.src = src;

            // const imgMP4s = Array.prototype.map.call(
            //   document.querySelectorAll(
            //     'img[src*=".mp4"]',
            //     'img[src*=".webm"]'
            //   ),
            //   (img) => {
            //     let src = img.src;
            //     img.src = null;

            //     img.addEventListener("error", function (e) {
            //       // console.log("MP4 in image not supported. Replacing with video", e);
            //       let video = document.createElement("video");

            //       for (let key in videoAttr) {
            //         video.setAttribute(key, videoAttr[key]);
            //       }

            //       for (
            //         let imgAttr = img.attributes, len = imgAttr.length, i = 0;
            //         i < len;
            //         i++
            //       ) {
            //         video.setAttribute(imgAttr[i].name, imgAttr[i].value);
            //       }

            //       img.parentNode.insertBefore(video, img);
            //       img.parentNode.removeChild(img);
            //     });

            //     img.src = src;
            //   }
            // );
          }
        }, 500);
      }
  }

  componentDidMount() {
    const {position, icon} = this.props; // eslint-disable-line react/prop-types
    this.marker = new BMap.Marker(toBMapPoint(position)); // eslint-disable-line no-undef
    if (this.props[MARKER_CLUSTERER]) {
      this.props[MARKER_CLUSTERER].addMarker(this.marker);
    } else {
      this.props[MAP].addOverlay(this.marker);
    }
    this.forceUpdate();
    this._renderVideos(icon || position);
  }

  render() {
    const {children} = this.props; // eslint-disable-line react/prop-types
    const marker = this.marker;
    if (children) {
      return (
        <div>
          {React.Children.map(children, (child) => {
            const hasPropTypes = child.type.propTypes && child.type.propTypes[MARKER] !== undefined;
            if (!hasPropTypes) {
              return child;
            }
            return React.cloneElement(child, {[MARKER]: marker});
          })}
        </div>
      );
    }
    return false;
  }
}

export default wrapClass(Marker, controlledPropTypes, controlledPropUpdater, publicMethodMap, eventMap);