/* AppToolbar.jsx */
import React from "react";
import { Button, Toolbar, Autocomplete, Grid, Cell, ResizeObserver } from "react-md";
import Nav from "./Nav";
import KebabMenu from "./KebabMenu";

let w, h;

const AppToolbar = ({
  searching,
  handleNavClick,
  handleActionClick,
  inset=false,
  fixed=false,
  title = process.env.REACT_APP_WEBSITE_NAME,
  className="phone-emulator__toolbar"
}) => {
	if (searching) {
    title =
      w >= 800 ? (
        <Grid className="grid-example">
          <Cell size={12}>
            <Autocomplete
              id="search-pastries"
              block={w >= 800}
              // data={pastryData}
              dataLabel="name"
              dataValue="key"
              // value={value}
              // onChange={this.handleChange}
              placeholder="试试搜索 鹿晗"
              // onAutocomplete={this.handleAutocomplete}
              // toolbar
              autoFocus
              fillViewportWidth={false}
              fullWidth={false}
            />
          </Cell>
        </Grid>
      ) : (
        <Autocomplete
          id="search-pastries"
          // data={pastryData}
          dataLabel="name"
          dataValue="key"
          // value={value}
          // onChange={this.handleChange}
          placeholder="试试搜索 鹿晗"
          // onAutocomplete={this.handleAutocomplete}
          // toolbar
          autoFocus
          fillViewportWidth={false}
          fullWidth={false}
        />
      );
  }
	const handleResize = ({ height, width, el }) => {
    // console.log(width, height);
		w = width;
		h = height;
	}
  return (
		<>
			<Toolbar
				title={title}
				titleId="search-pastries"
				className={className}
        fixed = {fixed}
        inset = {inset}
				nav={<Nav handleNavClick={handleNavClick} searching={searching} />}
				// colored
				// fixed
				actions={[
					<Button
						key="action"
						icon
						onClick={handleActionClick}
					>
						{searching ? "keyboard_voice" : "search"}
					</Button>,
					// <Button icon>send</Button>,
					<KebabMenu id="toolbar-prominent-kebab-menu" />
				]}
			/>
			<ResizeObserver watchWidth watchHeight onResize={handleResize} />
		</>
  );
};
export default AppToolbar;
