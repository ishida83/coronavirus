/* KebabMenu.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { MenuButton } from 'react-md';

const KebabMenu = ({ id, className, menuItems, onMenuClick }) => (
  <MenuButton
    id={id}
    icon
    onMenuClick={onMenuClick}
    className={className}
    menuItems={menuItems}
  >
    more_vert
  </MenuButton>
);

KebabMenu.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  menuItems: PropTypes.array,
};

KebabMenu.defaultProps = {
  menuItems: ['设置', '刷新', '反馈', '分享'],
};

export default KebabMenu;