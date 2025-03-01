import { useEffect } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

import { Post, usePostsStore } from "../store/PostsStore";
import PostListItem from "../components/PostListItem";

export default function EditPost() {
  const navigate = useNavigate();
  const { posts, fetchPosts } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Box
      sx={{
        minWidth: 800,
        margin: "auto",
        mt: 2,
        p: 2,
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          navigate(`/edit-post/`);
        }}
      >
        New Post
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.25,
          mb: 2,
        }}
      >
        <div>
          {posts.map((post: Post) => (
            <PostListItem post={post} />
          ))}
        </div>
      </Box>
    </Box>
  );
}
