import { Router } from 'express'

import addtab from "./addtab"
import gettabs from "./gettabs"
import protection from "./protection"
import logreg from "./logreg"
import songbooks from "./songbooks"

const router = Router()

// Add Routes
router.use(songbooks)
router.use(addtab)
router.use(gettabs)
router.use(protection)
router.use(logreg)

export default router
