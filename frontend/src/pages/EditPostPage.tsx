import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Post, usePostsStore } from "../store/PostsStore";
import DeletePostDialog from "../components/DeletePostDialog";

export default function EditPost() {
  const { posts, addPost, updatePost, deletePost, fetchPosts } =
    usePostsStore();

  const [currentPost, setCurrentPost] = useState<Post | null>(null);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);

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

  const deletePostClicked = (post: Post) => {
    deletePost(post);

    setPostToDelete(null);
  };

  return (
    <div>
      <h1>Edit Post</h1>

      <div>
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
          Save
        </Button>
      </div>

      <div>
        {posts.map((post: Post) => (
          <div>
            {post.title}
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
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
      <DeletePostDialog
        postToDelete={postToDelete}
        onDeleteClicked={deletePostClicked}
        onCloseClick={() => setPostToDelete(null)}
      />
    </div>
  );
}
