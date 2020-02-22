import React, { PureComponent } from "react";
import { BottomNavigation, FontIcon, Drawer, Toolbar, Button } from "react-md";
import AppToolbar from './components/AppToolbar';
import Expandable from './components/Expandable';
import drawerMenu from './components/DrawerMenu';
import Timelines from './components/Timelines';

const Recent = () => <div>热门</div>;
const Favorites = () => <div>收藏</div>;
const Nearby = () => <div>附近</div>;

const links = [
  {
    label: "热门",
    icon: <FontIcon>access_time</FontIcon>
  },
  {
    label: "收藏",
    icon: <FontIcon>favorite</FontIcon>
  },
  {
    label: "附近",
    icon: <FontIcon>place</FontIcon>
  }
];

export default class Fixed extends PureComponent {
  state = { 
    children: <Recent />,
    searching: false
  };

  handleNavChange = activeIndex => {
    let children;
    switch (activeIndex) {
      case 1:
        children = <Expandable />;
        // <Favorites key="favorites" />;
        break;
      case 2:
        children = <Nearby key="nearby" />;
        break;
      default:
        children = <Timelines key="recent" />;
    }

    this.setState({ children });
  };

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

  render() {
    const { children, searching,  visible  } = this.state;
    const closeBtn = <Button icon onClick={()=>this.handleVisibility(false)}>arrow_back</Button>;

    return (
      <>
        <AppToolbar
          searching={searching}
          handleNavClick={this.handleNavClick}
          handleActionClick={this.handleActionClick}
        />
        {children}
        <Drawer
          id="simple-drawer-example"
          type={Drawer.DrawerTypes.TEMPORARY}
          visible={visible}
          onVisibilityChange={this.handleVisibility}
          navItems={drawerMenu}
          header={(
            <Toolbar
              actions={closeBtn}
              className="md-divider-border md-divider-border--bottom"
            />
          )}
        />
        <BottomNavigation
          links={links}
          dynamic={false}
          onNavChange={this.handleNavChange}
        />
      </>
    );
  }
}
