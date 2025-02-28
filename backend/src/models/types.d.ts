import { Document, PaginateModel } from "mongoose";

export type PaginatedModel<T> = Document & PaginateModel<T>;
