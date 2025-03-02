import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Post } from "./types";
import { PaginatedModel } from "../types";

const PostSchema = new mongoose.Schema<Post>(
  {
    title: { type: String, required: true },
    content: { type: String },
    isArchived: { type: Boolean, default: false },
    type: { type: String, required: true },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PostSchema.plugin(mongoosePaginate);

const PostsSchemaWithPagination: PaginatedModel<Post> = mongoose.model<Post>(
  "Posts",
  PostSchema
) as PaginatedModel<Post>;

export default PostsSchemaWithPagination;
