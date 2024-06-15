import 'dotenv/config'
import { env } from "process";
import express, { Express, NextFunction, Request, Response} from "express";
import knex from 'knex'
import { Model } from 'objection'
import path from 'path'
import routes from '../config/routes'

const app: Express = express();
const knexInstance = knex({
    client: "postgresql",
    connection: {
        database: env.DB_NAME,
        user: env.DB_USER,
        password: env.DB_PASS,
        port: Number(env.DB_PORT)
      }
})
const port = 8000;

Model.knex(knexInstance);

//setup engine
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.set('views', path.join(__dirname, './server/views'))
app.set('view engine', 'ejs')

app.use(express.json())

app.use(routes)

export default app;