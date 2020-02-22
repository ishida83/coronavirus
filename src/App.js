import React, { PureComponent } from "react";
import { BottomNavigation, FontIcon } from "react-md";
import AppToolbar from './components/AppToolbar';
import Expandable from './components/Expandable';

const Recent = () => <div>Recent</div>;
const Favorites = () => <div>Favorites</div>;
const Nearby = () => <div>Nearby</div>;

const links = [
  {
    label: "Recent",
    icon: <FontIcon>access_time</FontIcon>
  },
  {
    label: "Favorites",
    icon: <FontIcon>favorite</FontIcon>
  },
  {
    label: "Nearby",
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
        children = <Recent key="recent" />;
    }

    this.setState({ children });
  };

  handleNavClick = () => {
    this.setState({searching: false})
  }

  handleActionClick = () => {
    if (this.state.searching) {
      this.setState({ value: '' });
    } else {
      this.setState({ searching: true });
    }
  }

  render() {
    const { children, searching } = this.state;

    return (
      <>
        <AppToolbar
          searching={searching}
          handleNavClick={this.handleNavClick}
          handleActionClick={this.handleActionClick}
        />
        {children}
        <BottomNavigation
          links={links}
          dynamic={false}
          onNavChange={this.handleNavChange}
        />
      </>
    );
  }
}
