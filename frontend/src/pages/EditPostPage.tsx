import { useLocation, useNavigate } from "react-router";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Post, PostType, usePostsStore } from "../store/PostsStore";
import PostTypeSelector from "../components/PostTypeSelector";
import MDEditor from "@uiw/react-md-editor";

export default function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addPost, updatePost } = usePostsStore();

  const [post, setPost] = useState<Post | null>(
    location.state ? location.state.post : null
  );
  const [type, setType] = useState(post ? post.type : PostType.Markdown);
  const [title, setTitle] = useState<string>(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");

  const addPostClicked = () => {
    if (title.trim()) {
      if (post) {
        updatePost({
          _id: post._id,
          title,
          content,
          type,
        });
      } else {
        addPost({
          title,
          content,
          type,
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
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            sx={{
              width: "70%",
            }}
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <PostTypeSelector type={type} setType={setType} />
        </Box>

        {type == PostType.Link ? (
          <TextField
            label="Link"
            placeholder="Enter link..."
            value={content}
            sx={{
              mt: 1,
            }}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <Box
            sx={{
              mt: 1,
            }}
          >
            <MDEditor value={content} onChange={setContent} />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            gap: 0.25,
            mt: 1,
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
