import React from "react";
import "./App.scss";

import BaiduMap from './components/map';
import SearchList from './components/searchList';
import { Layout, useLayoutNavigation } from "@react-md/layout";
import {
  KeyboardArrowDownSVGIcon,
  MenuSVGIcon,
} from "@react-md/material-icons";
import { Sheet, SheetPosition } from "@react-md/sheet";
import { useToggle } from "@react-md/utils";
import { Button } from "@react-md/button";
import {
  SearchSVGIcon,
  RemoveSVGIcon
} from "@react-md/material-icons";
import {
  AppBar,
  AppBarAction
} from "@react-md/app-bar";

const navItems = {};

function App() {
  const [visible, show, hide] = useToggle(false);

  return (
    <Layout
      {...useLayoutNavigation(navItems, window.location.pathname)}
      appBarTitle="星疫 | 本地疫情搜索"
      // navHeaderTitle="星疫"
      navIcon={<MenuSVGIcon />}
      expanderIcon={<KeyboardArrowDownSVGIcon />}
    >
      <BaiduMap />
      <Button
        id="icon-button-10"
        buttonType="icon"
        onClick={show}
        // theme="error"
        className="custom-portal-slider"
        aria-label="Slider"
      >
        <RemoveSVGIcon />
      </Button>
      <Button
        id="icon-button-11"
        buttonType="icon"
        onClick={show}
        theme="secondary"
        themeType="contained"
        className="custom-portal-container"
        aria-label="Query"
      >
        <SearchSVGIcon />
      </Button>
      {/* <Button
        id="show-sheet-position"
        onClick={show}
        theme="secondary"
        themeType="contained"
      >
        <TextIconSpacing icon={<FontIcon>search</FontIcon>}>
          查询
        </TextIconSpacing>
      </Button> */}

      <Sheet
        id="example-sheet-1"
        aria-label="Example Sheet"
        visible={visible}
        onRequestClose={hide}
        position="bottom"
      >
        <AppBar theme="clear" className="custom-center-appbar">
          <AppBarAction onClick={hide}>
            <RemoveSVGIcon />
          </AppBarAction>
        </AppBar>
        <SearchList />
      </Sheet>
    </Layout>
  );
}

export default App;
