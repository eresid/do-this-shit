import { useState } from "react";
import { Button, Box } from "@mui/material";

import { Post, usePostsStore } from "../store/PostsStore";
import DeletePostDialog from "../components/DeletePostDialog";

type Props = {
  post: Post;
  editPostClicked: (post: Post) => void;
};

const PostListItem = ({ post, editPostClicked }: Props) => {
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
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: 800,
        margin: "auto",
        mt: 1,
        p: 1,
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
            editPostClicked(post);
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
  );
};

export default PostListItem;
