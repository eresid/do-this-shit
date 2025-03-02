import { useLocation, useNavigate } from "react-router";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Post, PostType, usePostsStore } from "../store/PostsStore";
import PostTypeSelector from "../components/PostTypeSelector";
import PostMarkdownTabs from "../components/PostMarkdownTabs";

export default function EditPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addPost, updatePost } = usePostsStore();

  const [post, setPost] = useState<Post | null>(
    location.state ? location.state.post : null
  );
  const [type, setType] = useState(post ? post.type : PostType.Markdown);
  const [title, setTitle] = useState(post ? post.title : "");
  const [content, setContent] = useState(post ? post.content : "");
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

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
            id="outlined-basic"
            label="Title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <PostTypeSelector type={type} setType={setType} />
        </Box>

        {type == PostType.Markdown ? (
          <PostMarkdownTabs
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
          />
        ) : null}

        {isEditMode ? (
          <TextField
            id="outlined-textarea"
            label="Content"
            placeholder="Enter content..."
            multiline={type != PostType.Link}
            value={content}
            sx={{
              mt: 1,
            }}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
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
