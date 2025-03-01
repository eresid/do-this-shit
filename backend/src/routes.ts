import { Express } from "express";
import postsRouter from "./modules/posts/post.controller";
import tagsRouter from "./modules/tags/tag.controller";
// import tasksRouter from "./modules/tasks/task.controller";

export default (app: Express) => {
  app.use(postsRouter);
  app.use(tagsRouter);
  // app.use(tasksRouter);
};
