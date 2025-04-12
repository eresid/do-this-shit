import { describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectMockDatabase, disconnectMockDatabase } from "../utils/MockMongoLoader";
import { getMyPosts, createPost, updatePost, deletePost, PostBody, PostType } from "../api/post.apis";

/**
 * Post CRUD Tests
 *
 * To run only this tests:
 * npm run test -- post.test.ts
 */
describe("Run Post CRUD Tests", () => {
  let mongoDadabase: MongoMemoryServer;

  beforeAll(async () => {
    mongoDadabase = await connectMockDatabase();
  });

  afterAll(async () => {
    disconnectMockDatabase(mongoDadabase);
  });

  test("Post CRUD Testing - Check getMyPosts API", async () => {
    const emptyResponse = await getMyPosts();
    expect(emptyResponse.status).toBe(200);
    expect(emptyResponse.body).toEqual([]);

    const testPost: PostBody = {
      title: "some title",
      content: "some content",
      type: PostType.Link,
    };

    const newPostResponse = await createPost(testPost);
    validatePost(testPost, newPostResponse.body);

    const responseWithPost = await getMyPosts();
    expect(responseWithPost.body.length).toBe(1);
    validatePost(testPost, responseWithPost.body[0]);
  });

  const validatePost = (testPost: PostBody, postFromServer: PostBody) => {
    expect(postFromServer).toHaveProperty("title");
    expect(postFromServer.title).toBe(testPost.title);
    expect(postFromServer).toHaveProperty("content");
    expect(postFromServer.content).toBe(testPost.content);
    expect(postFromServer).toHaveProperty("type");
    expect(postFromServer.type).toBe(testPost.type);
    expect(postFromServer).toHaveProperty("isArchived");
    expect(postFromServer.isArchived).toBe(false);
    expect(postFromServer).toHaveProperty("_id");
    expect(postFromServer).toHaveProperty("createdAt");
    expect(postFromServer).toHaveProperty("updatedAt");
  };
});
