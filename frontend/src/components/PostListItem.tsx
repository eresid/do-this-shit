import { useState } from "react";
import { Box, Link } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";

import { Post, PostType, usePostsStore } from "../store/PostsStore";
import DeletePostDialog from "./DeletePostDialog";
import PostItemMenuButton from "./PostItemMenuButton";

type Props = {
  post: Post;
};

const PostListItem = ({ post }: Props) => {
  const navigate = useNavigate();
  const { deletePost } = usePostsStore();

  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [isPostOpen, setPostOpen] = useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const isLink = post.type == PostType.Link;

  const deletePostClicked = (post: Post) => {
    deletePost(post);

    setPostToDelete(null);
  };

  const onCopyLinkClicked = async () => {
    if (post.content) {
      await navigator.clipboard.writeText(post.content);

      setOpenSnackBar(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 800,
        mt: 0.75,
        px: 1,
        py: 0.5,
        border: 1,
        borderColor: "#e7eaee",
        background: "#fff",
        fontSize: 16,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            alignContent: "center",
          }}
        >
          {isLink ? (
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
              }}
            >
              <Link
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "#1976d5",
                }}
                href={post.content}
                target="_blank"
              >
                {post.title}
              </Link>
              <Box
                sx={{
                  cursor: "pointer",
                }}
                onClick={() => onCopyLinkClicked()}
              >
                🔗
              </Box>
            </Box>
          ) : (
            <Link
              sx={{
                cursor: "pointer",
                color: "#1976d5",
              }}
              onClick={() => setPostOpen(!isPostOpen)}
            >
              {post.title}
            </Link>
          )}
        </div>

        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <PostItemMenuButton
            onDeleteClick={() => setPostToDelete(post)}
            onEditClick={() => {
              navigate(`/edit-post/`, { state: { post: post } });
            }}
          />
        </Box>

        <DeletePostDialog
          postToDelete={postToDelete}
          onDeleteClicked={deletePostClicked}
          onCloseClick={() => setPostToDelete(null)}
        />
      </Box>

      {!isLink && isPostOpen ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mt: 1,
            fontSize: "16px",
            textAlign: "left",
          }}
        >
          <ReactMarkdown
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
            }}
          >
            {post.content?.split("\n").slice(0, 5).join("\n")}
          </ReactMarkdown>
        </Box>
      ) : null}
      <Snackbar
        open={openSnackBar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackBar(false)}
        message="Copied to clipboard"
      />
    </Box>
  );
};

export default PostListItem;
