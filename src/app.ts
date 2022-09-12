// libraries
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
// routes
import authRouter from './app/modules/auth/auth.router'

// app
const app: Express = express();

// environment variables
const port: number = Number(process.env.PORT) || 5000

// env variables
// https://www.npmjs.com/package/dotenv
dotenv.config();

// middleware
// body parser for json info
app.use(express.json())
// cors usage https://www.npmjs.com/package/cors
app.use(cors())
// morgan https://www.npmjs.com/package/morgan
app.use(morgan('tiny'))

// use routes
app.use("/api/auth", authRouter)
// app.use("/api/users", require("./app/modules/users/users.route"))
// app.use("/api/persons", require("./app/modules/persons/persons.route"))
// app.use("/api/foods", require("./app/modules/foods/foods.route"))
// app.use("/api/meals", require("./app/modules/meals/meals.route"))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// server initialization
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
})