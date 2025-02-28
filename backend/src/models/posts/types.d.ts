import { Model, Document } from "mongoose";
import { Tag } from "../tags/types";

export interface Post {
  title: string;
  post: string;
  isArchived: boolean;
  tags: Tag[];
}
