import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new Tab to database
router.post("/addtab", (req, res) => {

    const { title, artist, type, haslyrics, tab } = req.body
    const params = [ title, artist, type, haslyrics, tab ]
    const q = `
        INSERT INTO tabs
        (title, artist, type, haslyrics, tab)
        VALUES ($1, $2, $3, $4, $5)
    `;
    db.query(q, params)
        .then(() => res.json({success: true}))
        .catch(err => res.json({ error: err }))
})

// Update exisiting Tab
router.post("/update-tab", (req, res) => {

    const { title, artist, type, haslyrics, tab, id } = req.body
    const params = [ title, artist, type, haslyrics, tab, id ]
    const q = `
        UPDATE tabs
        SET (title, artist, type, hasLyrics, tab)
        = ( $1, $2, $3, $4, $5 )
        WHERE id = $6
    `

    db.query(q, params)
    .then(result => res.json({success: true}))
    .catch(err => res.json({ error: err }))
})

// Delete Tab
router.delete("/delete-tab", (req, res) => {

    let q = `
        DELETE FROM tabs
        WHERE id = $1
    `

    db.query(q, req.body.id)
    .then(() => res.json({success: true}))
    .catch(err => res.json({ error: err }))
})

export default router
