import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new tab to database
router.post("/addtab", (req, res, next) => {
    console.log("Inside POST");
    const { title, artist, type, hasLyrics, tab } = req.body
    const params = [ title, artist, type, hasLyrics, tab ]
    const q = `
        INSERT INTO tabs
        (title, artist, type, haslyrics, tab)
        VALUES ($1, $2, $3, $4, $5)
    `;
    db.query(q, params)
        .then(result => {
            console.log("insert DONE", result);
            res.json({ response: "Tab add DONE" })
        })
        .catch(err => res.json({ response: "Error: " + err }))
})

export default router
