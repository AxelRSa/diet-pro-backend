/* Loading the environment variables from the .env file. */
/* https://www.npmjs.com/package/dotenv */
import * as dotenv from 'dotenv'
import path from 'path'
dotenv.config({path: path.resolve(process.cwd(), '.env')})

/* Importing the libraries. */
import express, { Express } from 'express'
import cors from 'cors'
import morgan from 'morgan'

/* Importing the routes */
import authRouter from './app/modules/auth/auth.route'
import usersRouter from './app/modules/users/users.route'


/* Importing error middleware. */
import errorHandler from './app/middleware/errorHandler'
import logErrors from './app/middleware/errorLogger'

/* Creating an instance of express. */
const app: Express = express()

/* Setting the port to 5000 if the process.env.PORT is not set. */
const port: number = Number(process.env.PORT) || 5000

/* Middleware */
/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json())
/* https://www.npmjs.com/package/cors */
/* Allowing the server to accept requests from other domains. */
app.use(cors())
/* morgan https://www.npmjs.com/package/morgan */
/* A middleware that logs the requests to the console. */
app.use(morgan('tiny'))

/* Use routes */
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
// app.use("/api/persons", require("./app/modules/persons/persons.route"))
// app.use("/api/foods", require("./app/modules/foods/foods.route"))
// app.use("/api/meals", require("./app/modules/meals/meals.route"))

/* Error handling middleware */
app.use('*', logErrors)
app.use('*', errorHandler)

/* Starting the server. */
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`)
})
