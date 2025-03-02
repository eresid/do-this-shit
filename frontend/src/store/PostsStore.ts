import { create } from "zustand";
import axios from "axios";

// TODO move to envs
const API_URL = "http://localhost:4000/";

export interface Post {
  _id?: string;
  title: string;
  content?: string;
  type: PostType;
}

export enum PostType {
  Link = "link",
  Markdown = "markdown",
}

interface PostsState {
  posts: Post[];
  addPost: (post: Post) => void;
  updatePost: (post: Post) => void;
  deletePost: (post: Post) => void;
  fetchPosts: () => void;
}

export const usePostsStore = create<PostsState>()((set) => ({
  posts: [],

  addPost: async (post: Post) => {
    const { data } = await axios.post(API_URL + "posts", post);
    set((state) => ({ posts: [...state.posts, data] }));
  },

  updatePost: async (updatedPost: Post) => {
    const { data } = await axios.put(
      API_URL + `posts/${updatedPost._id}`,
      updatedPost
    );

    set((state) => ({
      posts: state.posts.map((post) =>
        post._id === updatedPost._id ? data : post
      ),
    }));
  },

  deletePost: async (postToDelete: Post) => {
    await axios.delete(API_URL + `posts/${postToDelete._id}`);
    set((state) => ({
      posts: state.posts.filter((post) => post._id !== postToDelete._id),
    }));
  },

  fetchPosts: async () => {
    const { data } = await axios.get(API_URL + "posts");
    set({ posts: data });
  },
}));
