import express from 'express'
import controllers from '../app/controllers'
import uploadOnMemory from '../app/middleware/MulterMemory'
import { authorize, checkAccess } from '../app/middleware/authorization'

const apiRouter = express.Router()
const appRouter = express.Router()



// appRouter.get('/', (req:Request, res:Response) => {
//     res.render('index', {
//         name: req.query.name || 'Guest'
//     })
// })

// login route
appRouter.get('/', controllers.app.user.index)
appRouter.get('/login', controllers.app.user.loginView)
appRouter.post('/login', controllers.app.user.login)
appRouter.get('/logout', controllers.app.user.logout)

// cars route
apiRouter.get("/api/v1/cars", [authorize, checkAccess(['user'])], controllers.api.cars.getCars)
apiRouter.get("/api/v1/cars/:id", controllers.api.cars.getCarByID)
apiRouter.post("/api/v1/cars", authorize, uploadOnMemory.single("image"), controllers.api.cars.addCar)
apiRouter.put("/api/v1/cars/:id", uploadOnMemory.single("image"), controllers.api.cars.updateCar)
apiRouter.delete("/api/v1/cars/:id", controllers.api.cars.deleteCar)

// users route
apiRouter.post("/api/v1/register", controllers.api.users.register)
apiRouter.post("/api/v1/login", controllers.api.users.login)
apiRouter.get("/api/v1/whoami", authorize, controllers.api.users.WhoAmI)

apiRouter.use(controllers.api.main.onLost) //Error404
apiRouter.use(controllers.api.main.onError) //Error500

export default {
    appRouter,
    apiRouter
};