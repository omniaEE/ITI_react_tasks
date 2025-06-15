import React, { useContext } from "react";
import Video from "./Video";
import { VideosContext } from "../context/videos";

const Videos = () => {
  const { videos, setVideos } = useContext(VideosContext);

  return (
<>
  <button
    onClick={() => {
      setVideos(videos.slice(0, 1));
    }}
    style={{ margin: "10px", padding: "6px 12px" }}
  >
    Test Re-render
  </button>

  <div style={{ display: "grid", gap: "20px" }}>
    {videos.map((video) => (
      <Video key={video.id} video={video} />
    ))}
  </div>
</>

  );
};

export default Videos;
