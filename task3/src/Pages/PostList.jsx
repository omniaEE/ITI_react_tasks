import { useEffect, useState } from "react";
import { getPostsByUser } from "../api/post";

import { getMe } from "../api/user";
import { Link } from "react-router-dom";
import "../assets/styles/PostList.css";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userRes = await getMe();
        const userId = userRes.data?.id;
        const postRes = await getPostsByUser(userId);
        setPosts(postRes.data);
      } catch (err) {
        console.error("Failed to fetch user's posts", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) return <p>Loading posts...</p>;
  if (!posts.length)
    return (
      <>
        <Link to="/create-post" className="btn btn-success mb-3">
          + Create New Post
        </Link>
        <p>No posts found for this user.</p>
      </>
    );

  return (
    <div>
      <h2 className="mb-4">My Posts</h2>
      <Link to="/create-post" className="btn btn-success mb-3">
        + Create New Post
      </Link>
      <div className="list-group">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="list-group-item list-group-item-action"
          >
            <h5 className="mb-1">{post.title}</h5>
            <p className="mb-1 text-muted">
              {post.summary || post.content?.slice(0, 100)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
