import { useEffect, useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";

import { Post, usePostsStore } from "../store/PostsStore";
import PostListItem from "../components/PostListItem";

export default function EditPost() {
  const { posts, addPost, updatePost, fetchPosts } = usePostsStore();

  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPostClicked = () => {
    if (title.trim()) {
      if (currentPost) {
        updatePost({
          _id: currentPost._id,
          title,
          content,
        });
      } else {
        addPost({
          title,
          content,
        });
      }

      setCurrentPost(null);
      setTitle("");
      setContent("");
    }
  };

  const editPostClicked = (post: Post) => {
    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content || "");
  };

  return (
    <Box
      sx={{
        minWidth: 800,
        margin: "auto",
        mt: 2,
        p: 2,
        boxShadow: 1,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
          mb: 2,
        }}
      >
        <Typography variant="h5">
          {currentPost ? "Edit Post" : "Add Post"}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 0.25,
            mb: 2,
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            id="outlined-textarea"
            label="Content"
            placeholder="Placeholder"
            multiline
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <Button variant="contained" onClick={addPostClicked}>
            {currentPost ? "Save" : "Create"}
          </Button>
        </Box>

        <div>
          {posts.map((post: Post) => (
            <PostListItem post={post} editPostClicked={editPostClicked} />
          ))}
        </div>
      </Box>
    </Box>
  );
}
