import { Model, Document } from "mongoose";
import { WALL_STATUS } from "../../constants/global.constants";

export interface Tag {
  name: string;
  color?: string;
  isArchived: boolean;
}
