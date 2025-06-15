import { createContext, useState } from "react";

export const VideosContext = createContext();

const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      name: "first video",
      description: "first video description",
    },
    {
      id: 2,
      name: "second video",
      description: "second video description",
    },
    {
      id: 3,
      name: "third video",
      description: "third video description",
    },
  ]);
  return (
    <VideosContext value={{ videos, setVideos }}>{children}</VideosContext>
  );
};

export default VideoProvider;
