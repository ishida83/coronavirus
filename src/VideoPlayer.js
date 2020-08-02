import React from "react";
import { Player, LoadingSpinner } from "video-react";

export default ({ poster = "/assets/poster.png", src = require('./assets/example.mp4')}) => {
  return (
    <Player playsInline poster={poster} src={src} fluid={false} width={300}>
      <LoadingSpinner />
    </Player>
  );
};
