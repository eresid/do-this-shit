import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { Post, usePostsStore } from "../store/PostsStore";

export default function EditPost() {
  const { posts, addPost, updatePost, fetchPosts } = usePostsStore();

  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  const addTaskClicked = () => {
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

  const editTaskClicked = (post: Post) => {
    console.log(JSON.stringify(post));

    setCurrentPost(post);
    setTitle(post.title);
    setContent(post.content || "");
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

        <Button variant="contained" onClick={addTaskClicked}>
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
                editTaskClicked(post);
              }}
            >
              Edit
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
