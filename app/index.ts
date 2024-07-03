import 'dotenv/config'
import { env } from "process";
import express, { Express, NextFunction, Request, Response} from "express";
import knex from 'knex'
import { Model } from 'objection'
import path from 'path'
import session from 'express-session';
import routes from '../config/routes'
import { Session } from 'inspector';

const app: Express = express();
//knex
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
//endknex

//setup view-engine
app.use('/public', express.static(path.resolve(__dirname, 'public')));
app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'ejs')

//setup express session
app.set('trust proxy', 1)
app.use(session({
  secret: String(env.SECRET_SESSION),
  resave: false,
  saveUninitialized: false,
}))

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(routes.appRouter)
app.use(routes.apiRouter)

export default app;