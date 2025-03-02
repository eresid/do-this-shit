import express, { Express } from "express";
import morgan from "morgan";
import appRoutes from "../routes";
import corsMiddleware from "./cors.middleware";
import { isDevEnv } from "../utils/EnvChecker";

export default function loadServer() {
  const app: Express = express();

  app.use(corsMiddleware);
  app.use(express.json());

  if (isDevEnv()) {
    app.use(morgan("tiny"));
  }

  appRoutes(app);

  return app;
}
