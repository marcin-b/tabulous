import { Router } from 'express'
import db from "./db"

const router = Router()



router.get("/", (res, req, next) => {
    console.log("inside auth get");
    next()
})


export default router
