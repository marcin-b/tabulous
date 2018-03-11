import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new Tab to database
router.post("/addtab", (req, res, next) => {
    console.log("Inside POST");
    const { title, artist, type, haslyrics, tab } = req.body
    const params = [ title, artist, type, haslyrics, tab ]
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

// Update exisiting Tab
router.post("/update-tab", (req, res, next) => {
    console.log("Inside update");
const { title, artist, type, haslyrics, tab, id } = req.body
    console.log("tab id & tab", id, tab);
    const params = [ title, artist, type, haslyrics, tab, id ]
    const q = `
        UPDATE tabs
        SET (title, artist, type, hasLyrics, tab)
        = ( $1, $2, $3, $4, $5 )
        WHERE id = $6
    `;
    db.query(q, params)
        .then(result => {
            console.log("Update Done: ", result);
            res.json({ response: "Tab Update DONE" })
        })
        .catch(err => res.json({ response: "Error while updating: " + err }))
})

export default router
