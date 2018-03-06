import { Router } from 'express'

import users from "./users"
import addtab from "./addtab"
import gettabs from "./gettabs"
import protection from "./protection"

const router = Router()

// Add Routes
router.use(users)
router.use(addtab)
router.use(gettabs)
router.use(protection)

export default router
