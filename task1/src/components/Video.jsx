import React from "react";
import Comments from "./Comments";

const Video = ({ video: { id, name, description } }) => {
  return (
    <div key={id} style={styles.videoContainer}>
      <h2>{name}</h2>
      <p>{description}</p>

     
      <Comments videoId={id} />
    </div>
  );
};

const styles = {
  videoContainer: {
    width: "100%",
    maxWidth: "320px",
    backgroundColor: "#f9fafb", 
    border: "1px solid #e5e7eb", 
    padding: "16px",
    borderRadius: "12px", 
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    marginBottom: "24px",
    transition: "transform 0.2s ease-in-out",
    cursor: "pointer",
  },
};

export default Video;
