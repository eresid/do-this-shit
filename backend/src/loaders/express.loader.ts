import express, { Express } from "express";
import appRoutes from "../routes";

export default function loadServer() {
  const app: Express = express();

  app.use(express.json());

  appRoutes(app);

  return app;
}
