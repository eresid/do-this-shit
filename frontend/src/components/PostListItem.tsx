import { useState } from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router";

import { Post, usePostsStore } from "../store/PostsStore";
import DeletePostDialog from "../components/DeletePostDialog";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  const navigate = useNavigate();
  const { deletePost } = usePostsStore();

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

  const deletePostClicked = (post: Post) => {
    deletePost(post);

    setPostToDelete(null);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        mt: 1,
        p: 2,
        boxShadow: 2,
        background: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {post.title}

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              navigate(`/edit-post/`, { state: { post: post } });
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              setPostToDelete(post);
            }}
            color="error"
          >
            Delete
          </Button>
        </Box>

        <DeletePostDialog
          postToDelete={postToDelete}
          onDeleteClicked={deletePostClicked}
          onCloseClick={() => setPostToDelete(null)}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 1,
          fontSize: "16px",
        }}
      >
        {post.content}
      </Box>
    </Box>
  );
};

export default PostListItem;
