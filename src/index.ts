import exp, { Express } from "express";
import beeperController from "./controllers/beeperController";
import "dotenv/config";
import Beeper from "models/beeperModel";
import BeeperService from "./services/beeperService";

const app: Express = exp();
app.use(exp.json());

app.use("/api/beepers", beeperController);



// const bepper:Beeper = {
//   name: "2 beeper",
//   detonated_at: "",
//   latitude: 0,
//   longitude: 0,
//   id: 99.0692703742598,
//   status: "manufactured",
//   create_at: new Date()
// }






app.listen(process.env.PORT, (): void =>
  console.log(`See you at http:localhost:${process.env.PORT}`)
);


