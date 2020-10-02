// in src/App.js
import * as React from "react";
import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { createBrowserHistory as createHistory } from "history";

import { PostList, PostEdit, PostCreate, PostIcon } from "./posts";
import { UserList, UserIcon } from "./users";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

import {authProvider} from "./authProvider";

import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    type: "dark", // Switching the dark mode on is a single property value change.
  },
});
const history = createHistory({
  basename: `/${process.env.REACT_APP_ADMIN_URL}`
});

const dataProvider = jsonServerProvider(`${process.env.REACT_APP_JSON_SERVER}`);
const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    title={`${process.env.REACT_APP_WEBSITE_NAME} Admin`}
    theme={theme}
    history={history}
    // authProvider={authProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;
