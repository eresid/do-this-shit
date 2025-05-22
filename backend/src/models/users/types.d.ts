import { Model, Document } from "mongoose";
import { WALL_STATUS } from "../../constants/global.constants";
import { Tag } from "../tags/types";

export interface User {
  _id: string;
  email: string;
  hashedPassword: string;
  role: string;
  validatePassword: (password: string) => boolean;
  setPassword: (password: string) => string;
  generateAccessToken: () => string;
  generateRefreshToken: () => string;
  createdAt: string;
  updatedAt: string;
}
