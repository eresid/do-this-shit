import express, { Express, Request, Response } from "express";

export default function loadServer() {
  const app: Express = express();

  app.use(express.json());

  return app;
}
