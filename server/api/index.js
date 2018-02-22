import { Router } from 'express'

import users from "./users"
import addtab from "./addtab"
import gettabs from "./gettabs"

const router = Router()

// Add Routes
router.use(users)
router.use(addtab)
router.use(gettabs)

export default router
