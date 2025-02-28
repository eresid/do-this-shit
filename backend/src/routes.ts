import { Express } from "express";
import postsRouter from "./modules/posts/post.controller";
// import tasksRouter from "./modules/tasks/task.controller";

export default (app: Express) => {
  app.use(postsRouter);
  // app.use(tasksRouter);
};
