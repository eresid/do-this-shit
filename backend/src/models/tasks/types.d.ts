import { Model, Document } from "mongoose";
import { WALL_STATUS } from "../../constants/global.constants";
import { Tag } from "../tags/types";

export enum TaskStatus {
  Pending = "pending",
  Completed = "completed",
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export interface Task {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  tags: Tag[];
}
