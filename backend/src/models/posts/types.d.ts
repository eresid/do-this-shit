import { Model, Document } from "mongoose";
import { Tag } from "../tags/types";

export enum PostType {
  Link = "link",
  Markdown = "markdown",
}

export interface Post {
  title: string;
  content: string;
  isArchived: boolean;
  type: PostType;
  tags: Tag[];
}
