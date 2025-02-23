import { Request, Response } from "express";
import loadServer from "./loaders/express.loader";
import { PORT } from "./constants/global.constants";
import mongooseLoader from "./loaders/mongoose.loader";

const startServer = () => {
  const app = loadServer();
  mongooseLoader();

  app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });

  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
  });
};

startServer();
