import exp, { Express } from "express";


// load enviroment variables
import "dotenv/config";



const app: Express = exp();
app.use(exp.json());




app.listen(process.env.PORT, (): void =>
  console.log(`See you at http:localhost:${process.env.PORT}`)
);
