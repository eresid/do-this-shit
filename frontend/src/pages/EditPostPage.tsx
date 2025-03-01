import { useLocation, useNavigate } from "react-router";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Post, usePostsStore } from "../store/PostsStore";

export default function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addPost, updatePost } = usePostsStore();

  const [post, setPost] = useState<Post | null>(
    location.state ? location.state.post : null
  );
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  const addPostClicked = () => {
    if (title.trim()) {
      if (post) {
        updatePost({
          _id: post._id,
          title,
          content,
        });
      } else {
        addPost({
          title,
          content,
        });
      }

      navigateBack();
    }
  };

  const navigateBack = () => {
    setPost(null);
    setTitle("");
    setContent("");

    navigate("/");
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h5">{post ? "Edit Post" : "Add Post"}</Typography>

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

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: 0.25,
            mb: 2,
          }}
        >
          <Button variant="contained" onClick={addPostClicked}>
            {post ? "Save" : "Create"}
          </Button>
          <Button variant="contained" onClick={navigateBack} color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
