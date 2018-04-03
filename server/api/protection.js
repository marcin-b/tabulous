import { Router } from 'express'
import db from "./db"
import * as cookieParser from "cookie-parser"
import * as csrf from "csurf"

const router = Router()
var csrfProtection = csrf({ cookie: true })


// CSRF middleware
router.get('/getcsrftoken', csrfProtection, (req, res) => {
    return res.json({ csrfToken: req.csrfToken() });
});


export default router
