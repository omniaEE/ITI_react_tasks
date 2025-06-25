import { APIClient } from ".";

export const getPostsByUser = async (userId) => {
  return await APIClient.get(`/posts/:${userId}`);
};
export const getPostById = async (postId) => {
  return await APIClient.get(`/posts/${postId}`);
};
export const getAllPosts = async () => {
  return await APIClient.get("/posts");
};
export const deletePost = async (postId) => {
  return await APIClient.delete(`/posts/${postId}`);
};
export const createPost = async ({ title, content, userId, sections }) => {
  return await APIClient.post("/posts", {
    title,
    content,
    userId,
    sections: sections.length
      ? sections.map((s) => ({ title: s.title, body: s.body }))
      : [], // Ensure it's an array even if empty
  });
};
