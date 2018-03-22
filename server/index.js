import express from 'express'
import { Nuxt, Builder } from 'nuxt'
import * as bodyParser from "body-parser"
import * as secrets from "../secrets"
import * as cookieParser from "cookie-parser"
import * as session from "express-session"
import * as csrf from "csurf"


import api from './api'

const app = express()
const router = express.Router()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.set('port', port)



// Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
router.use((req, res, next) => {
    Object.setPrototypeOf(req, app.request)
    Object.setPrototypeOf(res, app.response)
    req.res = res
    res.req = req
    next()
})

// Cookies & Sessions
app.use(session({
    secret: [process.env.SESSION_SECRET || secrets.sessSecret],
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14 // 2weeks
    }
}));

// Must be set after session and parsing
app.use(csrf({ cookie: true }));
app.use((req, res, next) => {
    res.cookie("mytoken", req.csrfToken())
    next()
})


// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)


// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
