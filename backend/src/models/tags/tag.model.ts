import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Tag } from "./types";
import { PaginatedModel } from "../types";

const TagSchema = new mongoose.Schema<Tag>(
  {
    name: { type: String, required: true },
    color: { type: String, required: true },
    isArchived: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TagSchema.plugin(mongoosePaginate);

const TagsSchemaWithPagination: PaginatedModel<Tag> = mongoose.model<Tag>("Tags", TagSchema) as PaginatedModel<Tag>;

export default TagsSchemaWithPagination;
