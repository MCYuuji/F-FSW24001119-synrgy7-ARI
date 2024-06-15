import 'dotenv/config'
import { env } from "process";
import express, { Express, NextFunction, Request, Response} from "express";
import {getCars, getCarByID, addCar, updateCar, deleteCar} from './server/api/cars/cars'
import knex from 'knex'
import { Model } from 'objection'
import uploadOnMemory from './server/middleware/MulterMemory'
import path from 'path'

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

//middleware
function isAdmin(req:Request, res:Response, next:NextFunction){
    if(req.query.iam === "admin"){
        next();
        return
    }

    res.status(401).send("you're not an Admin!")
}

app.get('/', (req:Request, res:Response) => {
    res.render('index', {
        name: req.query.name || 'Guest'
    })
})

app.get("/api/v1/cars", getCars)
app.get("/api/v1/cars/:id", getCarByID)
app.post("/api/v1/cars", uploadOnMemory.single("image"), addCar)
app.put("/api/v1/cars/:id", uploadOnMemory.single("image"), updateCar)
app.delete("/api/v1/cars/:id", deleteCar)

app.listen(port, () => console.log(`app listen on http://localhost:${port}`))