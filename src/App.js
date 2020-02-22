import React, { PureComponent } from "react";
import { BottomNavigation, FontIcon } from "react-md";

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
  state = { children: <Recent /> };

  handleNavChange = activeIndex => {
    let children;
    switch (activeIndex) {
      case 1:
        children = <Favorites key="favorites" />;
        break;
      case 2:
        children = <Nearby key="nearby" />;
        break;
      default:
        children = <Recent key="recent" />;
    }

    this.setState({ children });
  };

  render() {
    const { children } = this.state;

    return (
      <>
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
