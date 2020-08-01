import React from "react";
import { Player, LoadingSpinner } from "video-react";

export default ({ poster = "/assets/poster.png", src = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"}) => {
  return (
    <Player playsInline poster={poster} src={src} fluid={false} width={300}>
      <LoadingSpinner />
    </Player>
  );
};
