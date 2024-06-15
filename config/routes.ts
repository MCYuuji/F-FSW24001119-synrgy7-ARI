import express from 'express'
import controllers from '../app/controllers'
import uploadOnMemory from '../app/middleware/MulterMemory'

const apiRouter = express.Router()
// const appRouter = express.Router()



// appRouter.get('/', (req:Request, res:Response) => {
//     res.render('index', {
//         name: req.query.name || 'Guest'
//     })
// })

apiRouter.get("/api/v1/cars", controllers.api.cars.getCars)
apiRouter.get("/api/v1/cars/:id", controllers.api.cars.getCarByID)
apiRouter.post("/api/v1/cars", uploadOnMemory.single("image"), controllers.api.cars.addCar)
apiRouter.put("/api/v1/cars/:id", uploadOnMemory.single("image"), controllers.api.cars.updateCar)
apiRouter.delete("/api/v1/cars/:id", controllers.api.cars.deleteCar)

apiRouter.use(controllers.api.main.onLost) //Error404
apiRouter.use(controllers.api.main.onError) //Error500

export default apiRouter;