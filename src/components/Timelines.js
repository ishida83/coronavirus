import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { SVGIcon, FontIcon, Avatar, Media } from 'react-md';
import './Timeline.scss';
import {randomImage} from "../utils/random";
import cn from 'classnames';

const WorkIcon = props => (
  <Avatar src={props.avatar || randomImage()} role="presentation" />
);

const SchoolIcon = props => (
  <Avatar src={props.avatar || randomImage()} role="presentation" />
);

const StarIcon = props => (
	<FontIcon {...props}>
    star
  </FontIcon>
);

export default class Timelines extends React.Component {
  render() {
    return (
      <div className={cn("clear", this.props.className)}>
        <VerticalTimeline layout="1-column">
          {this.props.timelineData.map((item, idx) => (
            <VerticalTimelineElement
              key={item.payload.id}
              className={
                idx % 2 === 0
                  ? "vertical-timeline-element--education"
                  : "vertical-timeline-element--work"
              }
              date={item.ts}
              // iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={
                <Avatar
                  src={this.props.avatar || randomImage()}
                  role="presentation"
                />
              }
            >
							<h3 className="vertical-timeline-element-title">{item.key}</h3>
              <Media aspectRatio="1-1">
                <img
                  src={randomImage({ width: 300, height: 200 })}
                  alt="Something from unsplash.it"
                />
              </Media>
              
              <h4 className="vertical-timeline-element-subtitle">
                {item.payload.edge_media_to_caption.edges[0].node.text}
              </h4>
              <p>
                评：{item.payload.edge_media_to_comment.count} 赞：
                {item.payload.edge_media_preview_like.count}
              </p>
            </VerticalTimelineElement>
          ))}

          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  rgb(33, 150, 243)" }}
            date="2011 - present"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            icon={<WorkIcon />}
          >
            <h3 className="vertical-timeline-element-title">
              Creative Director
            </h3>
            <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
            <p>
              Creative Direction, User Experience, Visual Design, Project
              Management, Team Leading
            </p>
          </VerticalTimelineElement>

          <VerticalTimelineElement
            iconStyle={{ background: "rgb(16, 204, 82)", color: "#fff" }}
            icon={<StarIcon />}
          />
        </VerticalTimeline>
      </div>
    );
  }
}
