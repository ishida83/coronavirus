import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { BottomNavigation, FontIcon, Drawer, Toolbar, Button } from "react-md";
import AppToolbar from './components/AppToolbar';
import Expandable from './components/Expandable';
import drawerMenu from './components/DrawerMenu';
import Timelines from './components/Timelines';

// const Recent = () => <div>热门</div>;
// const Favorites = () => <div>收藏</div>;
const Nearby = (props) => <div {...props}>附近</div>;

const links = [
  {
    label: "热门",
    icon: <FontIcon>access_time</FontIcon>,
    to: '/',
    component: Link,
    page: Timelines
  },
  {
    label: "收藏",
    icon: <FontIcon>favorite</FontIcon>,
    to: '/fav',
    component: Link,
    page: Expandable
  },
  {
    label: "附近",
    icon: <FontIcon>place</FontIcon>,
    to: '/nearby',
    component: Link,
    page: Nearby
  }
];

const fetchData = () => {
  return fetch(process.env.REACT_APP_API_URL)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      return Promise.resolve(data);
    });
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = { 
      children: <Timelines key="recent" />,
      searching: false,
      timelineData: [],
      activeIndex: this.getInitialIndex(props.location?props.location.pathname:window.location.pathname)
    };
  }
  getInitialIndex = (pathname) => {
    let index = -1;
    links.some(({ to }, i) => {
      if (to === pathname) {
        index = i;
        return true;
      }

      return false;
    });

    return index === -1 ? 0 : index;
  }

  // handleNavChange = activeIndex => {
  //   let children;
  //   switch (activeIndex) {
  //     case 1:
  //       children = <Expandable />;
  //       // <Favorites key="favorites" />;
  //       break;
  //     case 2:
  //       children = <Nearby key="nearby" />;
  //       break;
  //     default:
  //       children = <Timelines key="recent" />;
  //   }

  //   this.setState({ activeIndex, children });
  // };

  handleNavClick = () => {
    if(!this.state.searching){
      this.setState({visible: true});
    }else{
      this.setState({searching: false})
    }
  }

  handleActionClick = () => {
    if (this.state.searching) {
      this.setState({ value: '' });
    } else {
      this.setState({ searching: true });
    }
  }
  handleVisibility = (visible) => {
    this.setState({ visible });
  };

  componentDidMount(){
    fetchData().then(data => {
      this.setState({
        timelineData: data
      })
    })
  }

  render() {
    const { searching,  visible, activeIndex  } = this.state;
    const closeBtn = <Button icon onClick={()=>this.handleVisibility(false)}>arrow_back</Button>;

    return (
      <Router basename={process.env.NODE_ENV==='production' ? '/new' : ''}>
        <AppToolbar
          searching={searching}
          handleNavClick={this.handleNavClick}
          handleActionClick={this.handleActionClick}
        />
        <Switch>
          ...{links.map(link => (
            <Route path={link.to} exact render={(props) => <link.page {...props} timelineData={this.state.timelineData} />} key={link.label}/>
          ))}
        </Switch>
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          navItems={drawerMenu}
          header={
            <Toolbar
              actions={closeBtn}
              className="md-divider-border md-divider-border--bottom"
            />
          }
        />
        <BottomNavigation
          links={links.map(item => {let {page, ...newItem} = item; return newItem})}
          dynamic
          // onNavChange={this.handleNavChange}
          defaultActiveIndex={activeIndex}
          // colored
        />
      </Router>
    );
  }
}


export default App;