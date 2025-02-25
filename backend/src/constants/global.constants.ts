import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`),
});

export const PORT = Number(process.env.PORT) || 4000;
export const MONGODB_URL = process.env.MONGODB_URL || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const NODE_ENV = process.env.NODE_ENV || "development";
