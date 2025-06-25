import { useState } from "react";
import { createPost } from "../api/post";
import { useNavigate } from "react-router-dom";

import "../assets/styles/CreatePost.css"; // Assuming you have some styles for this component

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const userId = 1;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPost({
        title,
        content,
        userId,
        sections: [],
      });
      navigate("/my-posts");
    } catch (error) {
      console.error("Failed to create post", error);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
