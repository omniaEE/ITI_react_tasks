import React from "react";
import Video from "./Video";
import { VideosContext } from "../context/videos";
import Videos from "./Videos";

const VideoList = () => {
  return (
    <section>
      <Videos />
    </section>
  );
};

export default VideoList;
