import { describe, expect, test } from "@jest/globals";
import { MongoMemoryServer } from "mongodb-memory-server";
import { clearMockDatabase, connectMockDatabase, disconnectMockDatabase } from "../utils/MockMongoLoader";
import { getMyTags, createTag, updateTag, deleteTag, TagBody, Tag } from "../api/tag.apis";

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

  test("Tag CRUD Testing - Check Search Tags API", async () => {
    await createTestTags();

    const testTagsResponse = await getMyTags();
    expect(testTagsResponse.status).toBe(200);
    expect(testTagsResponse.body.length).toBe(4);

    const tagToCheck = testTagsResponse.body.filter((tag: TagBody) => tag.name === "Node.js")[0];

    const testSearchTagsResponse = await getMyTags("node");
    expect(testSearchTagsResponse.status).toBe(200);
    expect(testSearchTagsResponse.body.length).toBe(1);

    validateTag(tagToCheck, testSearchTagsResponse.body[0]);
  });

  test("Tag CRUD Testing - Check Get All Tags & Delete Tag API", async () => {
    await clearMockDatabase();

    const emptyResponse = await getMyTags();
    expect(emptyResponse.status).toBe(200);
    expect(emptyResponse.body).toEqual([]);

    const newTag: TagBody = {
      name: "some name",
      color: "some color",
    };

    const newTagResponse = await createOneTag(newTag.name!, newTag.color!);
    validateTag(newTag, newTagResponse.body);

    const responseWithTag = await getMyTags();
    expect(responseWithTag.body.length).toBe(1);
    validateTag(newTag, responseWithTag.body[0]);

    // Delete existing Tag
    const deletedExistingTagResponse = await deleteTag(responseWithTag.body[0]._id);
    expect(deletedExistingTagResponse.status).toBe(200);
    expect(deletedExistingTagResponse.body).toEqual({});

    const responseAfterDeletedTag = await getMyTags();
    expect(responseAfterDeletedTag.body.length).toBe(0);

    // Delete non-existent Tag
    const deletedNonExistingTagResponse = await deleteTag(responseWithTag.body[0]._id);
    expect(deletedNonExistingTagResponse.status).toBe(404);
    expect(deletedNonExistingTagResponse.body).toHaveProperty("message");
    expect(deletedNonExistingTagResponse.body.message).toEqual("The tag not found");
  });

  test("Tag CRUD Testing - Check Create & Update Tag API", async () => {
    const newTag: TagBody = {
      name: "some name",
      color: "some color",
    };

    const newTagResponse = await createOneTag(newTag.name!, newTag.color!);
    validateTag(newTag, newTagResponse.body);

    const newTagId = newTagResponse.body._id;

    // TODO Update Tag
    const updatedTag: TagBody = {
      name: "some name 2",
      color: "some color 2",
    };

    const updatedTagResponse = await updateTag(newTagId, updatedTag);
    // expect(updatedTagResponse.body.length).toBe(1);
    // validateTag(updatedTag, updatedTagResponse.body[0]);
  });

  const validateTag = (testTag: TagBody, tagFromServer: Tag) => {
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

  const createTestTags = async () => {
    await createOneTag("React", "#34eb55");
    await createOneTag("Node.js", "#eba534");
    await createOneTag("MongoDB", "#eb34d6");
    await createOneTag("PostgreSQL", "#0d0e1c");
  };

  const createOneTag = async (name: string, color: string) => {
    const newTag: TagBody = { name, color };

    return await createTag(newTag);
  };
});
