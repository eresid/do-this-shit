import { describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectMockDatabase, disconnectMockDatabase } from "../utils/MockMongoLoader";
import { getMyTags, createTag, updateTag, deleteTag, TagBody } from "../api/tag.apis";

/**
 * Tag CRUD Tests
 *
 * To run only this tests:
 * npm run test -- tag.test.ts
 */
describe("Run Tag CRUD Tests", () => {
  let mongoDadabase: MongoMemoryServer;

  beforeAll(async () => {
    mongoDadabase = await connectMockDatabase();
  });

  afterAll(async () => {
    disconnectMockDatabase(mongoDadabase);
  });

  test("Tag CRUD Testing - Check getMyTags API", async () => {
    const emptyResponse = await getMyTags();
    expect(emptyResponse.status).toBe(200);
    expect(emptyResponse.body).toEqual([]);

    const testTag: TagBody = {
      name: "some name",
      color: "some color",
    };

    const newTagResponse = await createTag(testTag);
    validateTag(testTag, newTagResponse.body);

    const responseWithTag = await getMyTags();
    expect(responseWithTag.body.length).toBe(1);
    validateTag(testTag, responseWithTag.body[0]);
  });

  const validateTag = (testTag: TagBody, tagFromServer: TagBody) => {
    expect(tagFromServer).toHaveProperty("name");
    expect(tagFromServer.name).toBe(testTag.name);
    expect(tagFromServer).toHaveProperty("color");
    expect(tagFromServer.color).toBe(testTag.color);
    expect(tagFromServer).toHaveProperty("isArchived");
    expect(tagFromServer.isArchived).toBe(false);
    expect(tagFromServer).toHaveProperty("_id");
    expect(tagFromServer).toHaveProperty("createdAt");
    expect(tagFromServer).toHaveProperty("updatedAt");
  };
});
