import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Task, TaskPriority, TaskStatus } from "./types";
import { PaginatedModel } from "../types";

const TaskSchema = new mongoose.Schema<Task>(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: Object.values(TaskPriority), default: TaskPriority.Medium },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.Pending },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

TaskSchema.plugin(mongoosePaginate);

const TasksSchemaWithPagination: PaginatedModel<Task> = mongoose.model<Task>(
  "Tasks",
  TaskSchema
) as PaginatedModel<Task>;

export default TasksSchemaWithPagination;
