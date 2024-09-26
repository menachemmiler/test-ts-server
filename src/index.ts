import exp, { Express } from "express";
import beeperController from "./controllers/beeperController";
import "dotenv/config";
import Beeper from "models/beeperModel";
import BeeperService from "./services/beeperService";

const app: Express = exp();
app.use(exp.json());

app.use("/api/beepers", beeperController);










app.listen(process.env.PORT, (): void =>
  console.log(`See you at http:localhost:${process.env.PORT}`)
);


