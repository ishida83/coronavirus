import React from "react";
import { List, ListItem, ListSubheader } from "@react-md/list";
import cn from "classnames";
import { InfoOutlineSVGIcon } from "@react-md/material-icons";
import logo from "../logo.svg";
import { SearchSVGIcon, KeyboardVoiceSVGIcon } from "@react-md/material-icons";
import {
  TextField,
} from "@react-md/form";

import {
  AppBarNav,
  AppBar,
  AppBarAction,
  AppBarTitle
} from "@react-md/app-bar";

const lastAccessedPhotos = new Date(2020, 0, 4);
const lastAccessedRecipes = new Date();
lastAccessedRecipes.setDate(lastAccessedRecipes.getDate() - 2);
const lastAccessedWork = new Date();

const formatShort = d =>
  d.toLocaleString(undefined, {
    month: "short",
    day: "2-digit",
    year: "numeric"
  });

const InfoIcon = ({ id, className, date: _date, ...props }) => (
  <span
    id={`${id}-info`}
    tabIndex={0}
    className={cn("two-line-list-example__icon", className)}
  >
    <InfoOutlineSVGIcon {...props} />
  </span>
);

function SearchList() {  
  const handleClick = () => {
    import("./moduleA")
      .then(({ moduleA }) => {
        // Use moduleA
        alert(moduleA);
      })
      .catch(err => {
        // Handle failure
      });
  };

  return (
    <List className="two-line-list-example">
      <ListSubheader>暂无疫情数据，系统持续更新中</ListSubheader>
      <AppBar>
        <AppBarNav id="phone-nav">
          <SearchSVGIcon />
        </AppBarNav>
        <AppBarTitle>
          <TextField
            id="contact-email"
            name="query"
            label=""
            placeholder="输入地址查看周边疫情"
            theme="none"
          />
        </AppBarTitle>
        <AppBarAction id="phone-action" first last>
          <KeyboardVoiceSVGIcon />
        </AppBarAction>
      </AppBar>

      <ListItem
        id="two-line-item-0"
        secondaryText={formatShort(lastAccessedPhotos)}
        rightIcon={<InfoIcon id="two-line-item-0" date={lastAccessedPhotos} />}
        rightPosition="top"
      >
        徐汇区
      </ListItem>
      <ListItem
        id="two-line-item-1"
        secondaryText={formatShort(lastAccessedRecipes)}
        rightIcon={<InfoIcon id="two-line-item-1" date={lastAccessedRecipes} />}
        rightPosition="top"
      >
        长宁区
      </ListItem>
      <ListItem
        id="two-line-item-2"
        secondaryText={formatShort(lastAccessedWork)}
        rightIcon={<InfoIcon id="two-line-item-2" date={lastAccessedWork} />}
        rightPosition="top"
      >
        黄浦区
      </ListItem>
      {/* <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            onClick={this.handleClick}
          />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div> */}
    </List>
  );
}

export default SearchList;