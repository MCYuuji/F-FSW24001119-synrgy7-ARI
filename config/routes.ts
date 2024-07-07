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

// login app route
appRouter.get('/', controllers.app.user.index)
appRouter.get('/login', controllers.app.user.loginView)
appRouter.post('/login', controllers.app.user.login)
appRouter.get('/logout', controllers.app.user.logout)

// cars api route
apiRouter.get("/api/v1/cars", [authorize, checkAccess(['user','admin','superadmin'])], controllers.api.cars.getCars)
apiRouter.get("/api/v1/cars/:id", [authorize, checkAccess(['user','admin','superadmin'])], controllers.api.cars.getCarByID)
apiRouter.post("/api/v1/cars", [authorize, checkAccess(['admin','superadmin'])], uploadOnMemory.single("image"), controllers.api.cars.addCar)
apiRouter.put("/api/v1/cars/:id", [authorize, checkAccess(['admin','superadmin'])], uploadOnMemory.single("image"), controllers.api.cars.updateCar)
apiRouter.delete("/api/v1/cars/:id", [authorize, checkAccess(['admin','superadmin'])], controllers.api.cars.deleteCar)

// auth api route
apiRouter.post("/api/v1/register", controllers.api.auth.register)
apiRouter.post("/api/v1/login", controllers.api.auth.login)
apiRouter.get("/api/v1/whoami", [authorize, checkAccess(['user','admin','superadmin'])], controllers.api.auth.WhoAmI)

// users api route
apiRouter.get("/api/v1/users", [authorize, checkAccess(['admin','superadmin'])], controllers.api.users.getUsers)
apiRouter.get("/api/v1/users/:id", [authorize, checkAccess(['admin','superadmin'])], controllers.api.users.getUserByID)
apiRouter.post("/api/v1/users", [authorize, checkAccess(['admin','superadmin'])], uploadOnMemory.single("image"), controllers.api.users.addUser)
apiRouter.put("/api/v1/users/:id", [authorize, checkAccess(['admin','superadmin'])], uploadOnMemory.single("image"), controllers.api.users.updateUser)
apiRouter.delete("/api/v1/users/:id", [authorize, checkAccess(['admin','superadmin'])], controllers.api.users.deleteUser)

//OAUTH2 google
apiRouter.post('/auth/google', controllers.api.auth.googleAuth)
apiRouter.post('/auth/google/refresh', controllers.api.auth.googleAuthRefresh)

apiRouter.use(controllers.api.main.onLost) //Error404
apiRouter.use(controllers.api.main.onError) //Error500

export default {
    appRouter,
    apiRouter
};