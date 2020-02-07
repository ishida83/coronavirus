import React from "react";
import Home from './Home';
import "./App.scss";

import NavigationDrawer from 'react-md/lib/NavigationDrawers/NavigationDrawer';

function App() {
  

  return (
    <NavigationDrawer
        drawerTitle="react-md with CRA"
        toolbarTitle="Welcome to react-md"
      >
      <Home />
    </NavigationDrawer>
  );
}

export default App;
