import supertest from "supertest";
import loadServer from "../../src/loaders/express.loader";

const app = loadServer();

export type TagBody = {
  name?: string;
  color?: string;
  isArchived?: boolean;
};

export const getMyTags = async () => {
  return await supertest(app).get("/tags");
};

export const createTag = async (body: TagBody | undefined) => {
  return await supertest(app).post("/tags").send(body);
};

export const updateTag = async (id: string, body: TagBody | undefined) => {
  return await supertest(app).post(`/tags/${id}`).send(body);
};

export const deleteTag = async (id: string) => {
  return await supertest(app).post(`/tags/${id}`);
};
