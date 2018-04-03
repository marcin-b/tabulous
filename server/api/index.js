import { Router } from 'express'

import users from "./users"
import addtab from "./addtab"
import gettabs from "./gettabs"
import protection from "./protection"
import logreg from "./logreg"
import songbooks from "./songbooks"

const router = Router()

// Add Routes
router.use(songbooks)
router.use(users)
router.use(addtab)
router.use(gettabs)
router.use(protection)
router.use(logreg)

export default router
