/* AppToolbar.jsx */
import React from "react";
import { Button, Toolbar, Autocomplete, Grid, Cell } from "react-md";
import Nav from "./Nav";
import KebabMenu from "./KebabMenu";

const AppToolbar = ({
  searching,
  handleNavClick,
  handleActionClick,
  title = "星志时间轴",
  className
}) => {
	if (searching) {
    title = (
      <Autocomplete
				id="search-pastries"
				// block
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
  return (
    <Toolbar
      title={title}
      titleId="search-pastries"
      className={className}
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
  );
};
export default AppToolbar;
