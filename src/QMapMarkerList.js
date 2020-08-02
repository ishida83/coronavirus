import React from 'react'
import PropTypes from 'prop-types'
import { Marker, config } from 'react-tmap';

export default class MarkerList extends React.Component {
  static defaultProps = {
    data: [],
    animation: config.ANIMATION_DROP,
    showDecoration: true
  }

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    )
  }

  render () {
    const { data, showDecoration, icons, ...rest } = this.props
    return data.map((item, i) => {
      const options = {...rest}
      options.position = item
      if (showDecoration) {
        options.decoration = item.decoration ? item.decoration : (i + 1)
      }
      if(icons) {
          options.icon = icons[i];
      }
      return <Marker key={i} {...options} />
    })
  }
}
