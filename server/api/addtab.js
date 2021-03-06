import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new Tab to database
router.post("/addtab", (req, res) => {

    const { title, artist, type, haslyrics, tab, creatorId } = req.body
    const params = [ title, artist, type, haslyrics.toString(), tab, creatorId ]
    const q = `
        INSERT INTO tabs (title, artist, type, haslyrics, tab, creator_id, ver)
        VALUES ($1, $2, $3, $4, $5, $6, (SELECT COUNT(*) FROM tabs
        WHERE title = $1
        AND artist = $2
        AND type = $3
        AND haslyrics = $4))`
    db.query(q, params)
    .then(result => {

        res.json({success: true})
    })
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
    // second query delets the tab from any songbooks that have the tab
    let q = `
        DELETE FROM tabs
        WHERE id = $1;
        UPDATE songbooks SET tabs = array_remove(tabs, $1)
        WHERE $1 = ANY(tabs)
    `
    db.query(q, req.body.id)
    .then((resp) => {
        res.json({ successful: true })
    })
    .catch(err => res.json({ error: err }))
})

export default router
