import { useEffect, useState } from "react";
import { fetchCommentsByVideoId, postComment } from "../api/fakeApi";

const Comments = ({ videoId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetchCommentsByVideoId(videoId).then(setComments);
  }, [videoId]);

  const handlePost = () => {
    if (newComment.trim()) {
      postComment(videoId, newComment).then((comment) => {
        setComments((prev) => [...prev, comment]);
        setNewComment("");
      });
    }
  };

  return (
    <div className="comments-section">
      <h3>Comments</h3>
      <div className="comments-list">
        {comments.map((c) => (
          <div key={c.id} className="comment">{c.text}</div>
        ))}
      </div>
      <textarea
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="comment-input"
      />
      <button onClick={handlePost} className="post-button">Post</button>
    </div>
  );
};

export default Comments;