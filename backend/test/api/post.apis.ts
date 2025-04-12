import supertest from "supertest";
import loadServer from "../../src/loaders/express.loader";

const app = loadServer();

export type PostBody = {
  title?: string;
  content?: string;
  type?: PostType;
  isArchived?: boolean;
};

export enum PostType {
  Link = "link",
  Markdown = "markdown",
}

export const getMyPosts = async () => {
  return await supertest(app).get("/posts");
};

export const createPost = async (body: PostBody | undefined) => {
  return await supertest(app).post("/posts").send(body);
};

export const updatePost = async (id: string, body: PostBody | undefined) => {
  return await supertest(app).post(`/posts/${id}`).send(body);
};

export const deletePost = async (id: string) => {
  return await supertest(app).post(`/posts/${id}`);
};
