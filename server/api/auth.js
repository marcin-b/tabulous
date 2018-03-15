import { Router } from 'express'
import db from "./db"

const router = Router()



router.get("/", (res, req) => {
    console.log("inside auth get");
})


export default router
