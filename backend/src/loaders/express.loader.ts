import express, { Express } from "express";
import appRoutes from "../routes";
import corsMiddleware from "./cors.middleware";

export default function loadServer() {
  const app: Express = express();

  app.use(corsMiddleware);
  app.use(express.json());

  appRoutes(app);

  return app;
}
