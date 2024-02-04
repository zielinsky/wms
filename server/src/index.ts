import cors from "cors";
import express, { Express, Request, Response } from "express";
import UserRoutes from "./routers/users.router";
import warehousesRouter from "./routers/warehouses.router";

export const app: Express = express();
const port = 3000;

app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use("/api/users", UserRoutes.router);
app.use("/api/warehouses", warehousesRouter.router);
