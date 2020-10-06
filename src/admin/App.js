// in src/App.js
import * as React from "react";
import { Admin, Resource, ListGuesser, Login } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { createBrowserHistory as createHistory } from "history";

import { PostList, PostEdit, PostCreate, PostIcon } from "./posts";
import { UserList, UserIcon } from "./users";
import { RoomIcon, VideoList, VideoEdit, VideoCreate } from "./cities";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";

import authProvider from "./authProvider";
import i18nProvider from './i18n/i18nProvider';

import { createMuiTheme } from "@material-ui/core/styles";
const theme = createMuiTheme({
  palette: {
    type: "dark", // Switching the dark mode on is a single property value change.
  },
});
const history = createHistory({
  basename: `${process.env.PUBLIC_URL}/admin`
});

const dataProvider = jsonServerProvider(`${process.env.REACT_APP_JSON_SERVER}`);

const MyLoginPage = () => (
    <Login
        // A random image that changes everyday
        backgroundImage="https://source.unsplash.com/random/1600x900/daily"
    />
);


const App = () => (
  <Admin
    dashboard={Dashboard}
    dataProvider={dataProvider}
    title={`${process.env.REACT_APP_WEBSITE_NAME} Admin`}
    theme={theme}
    history={history}
    locale="zh"
    loginPage={MyLoginPage}
    authProvider={authProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name="posts"
      list={PostList}
      edit={PostEdit}
      create={PostCreate}
      icon={PostIcon}
    />
    <Resource name="users" list={ListGuesser} icon={UserIcon}/>
    <Resource name="cities" list={VideoList} edit={VideoEdit} create={VideoCreate} icon={RoomIcon}/>
  </Admin>
);

export default App;
