/* Nav.jsx */
import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md';

const Nav = ({ className, searching, handleNavClick }) => (
	<>
		<Button
			key="nav"
			icon
			className={className}
			onClick={handleNavClick}
		>
			{searching ? 'arrow_back' : 'menu'}
		</Button>
		{/* <Button icon className={className}>menu</Button> */}
	</>
);

Nav.propTypes = {
  className: PropTypes.string,
};

export default Nav;