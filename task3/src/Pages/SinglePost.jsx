import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById, deletePost } from "../api/post";
import "../assets/styles/PostList.css";

export default function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error("Failed to fetch post", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        navigate("/my-posts");
      } catch (err) {
        console.error("Failed to delete post", err);
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      {post.sections?.length > 0 && (
        <>
          <h4>Sections:</h4>
          {post.sections.map((section, idx) => (
            <div key={idx}>
              <h5>{section.title}</h5>
              <p>{section.body}</p>
            </div>
          ))}
        </>
      )}

      <div className="mt-4">
        <Link to={`/edit-post/${post.id}`} className="btn btn-primary me-2">
          Edit
        </Link>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
