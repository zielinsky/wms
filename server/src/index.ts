import UserRoutes from "./routers/users.router";
import express, { Express, Request, Response } from "express";
import cors from "cors";

export const app: Express = express();
const port = 3000;

app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/users", UserRoutes.router);
