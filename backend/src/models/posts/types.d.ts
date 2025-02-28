import { Model, Document } from "mongoose";
import { Tag } from "../tags/types";

export interface Post {
  title: string;
  content: string;
  isArchived: boolean;
  tags: Tag[];
}
