let commentsDB = {
  1: [{ id: 1, text: "Great video!" }],
  2: [{ id: 2, text: "Very informative." }],
  3: [{ id: 3, text: "Loved it!" }],
};

export const fetchCommentsByVideoId = async (videoId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(commentsDB[videoId] || []);
    }, 500);
  });
};

export const postComment = async (videoId, text) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = { id: Date.now(), text };
      if (!commentsDB[videoId]) commentsDB[videoId] = [];
      commentsDB[videoId].push(newComment);
      resolve(newComment);
    }, 300);
  });
};
