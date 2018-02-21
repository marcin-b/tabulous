import { Router } from 'express'

import users from './users'
import addtab from "./addtab"

const router = Router()

// Add USERS Routes
router.use(users)
router.use(addtab)

export default router
