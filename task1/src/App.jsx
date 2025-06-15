import { useContext } from "react";
import VideoList from "./components/VideoList";
import { VideosContext } from "./context/videos";
import './App.css'; 

function App() {
  const { videos, setVideos, totalViews } = useContext(VideosContext);
  const count = videos.length;
  let heading;
  if (count > 0) {
    const noun = count > 1 ? "Videos" : "Video";
    heading = count + " " + noun;
  }
  return (
    <>
      why, what ,and how react!?
      <button
        onClick={() => {
          setVideos(videos.slice(0, 1));
        }}
      >
        test re-render
      </button>
      <h2>{heading}</h2>
      <VideoList />
    </>
  );
}

export default App;
