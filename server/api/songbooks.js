import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new Songbook
router.post("/create-songbook", (req, res) => {

    const { ownerId, name } = req.body
    const params = [ ownerId, name ]
    const q = `
        INSERT INTO songbooks
        (owner_id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    db.query(q, params)
        .then((result) => {
            res.json({ newSongbook:result[0] })
        })
        .catch(err => {
            res.json({ err })
        })
})


// Get Songbooks
router.get("/songbooks", (req, res) => {

    const q = `
        SELECT * FROM songbooks
        WHERE owner_id = $1
    `
    db.query(q, req.session.authUser.id)
    .then(songbooks => {
        res.json( songbooks )
    })
    .catch(err => {
        res.json({ error: err })
    })
})

// GET one songbook
router.get("/songbook/:id", (req, res) => {

    const q = `
        SELECT * FROM songbooks
        WHERE id = $1
    `
    db.query(q, req.params.id)
    .then(songbook => {

        // Check if songbook has songs added
        if (songbook[0].tabs && songbook[0].tabs.length > 0) {

            // Generate "$x" string to match length of tab array
            var valueStr = ""
            songbook[0].tabs.forEach((tab, index) => {
                if ((index+1) === songbook[0].tabs.length) {
                    valueStr += "$" + (index+1)
                } else {
                    valueStr += "$" + (index+1) + ", "
                }
            })
            let getTab = `
            SELECT title, artist, id, type, haslyrics FROM tabs
            WHERE id IN (${valueStr})
            `
            db.query(getTab, songbook[0].tabs)
            .then(tabs => {
                res.json({
                    songbook: songbook[0],
                    tabs
                })
            })
            .catch(err => res.json({ "Error geting tabs from SB": err }))

        // If SB has no song retrun the SB
        } else {
            res.json({ songbook : songbook[0] })
        }

    })
    .catch(err => {
        res.json({ error: err })
    })
})

// Delete Songbook
router.delete("/delete-songbook/:id", (req, res, next) => {

    const q = `
        DELETE FROM songbooks
        WHERE id = $1
    `
    db.query(q, req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ error: err }))
})

// Add tab to Songbooks
router.post("/add-tab-to-songbook", (req, res) => {

    const { tabId, sbId } = req.body
    const params = [ tabId, sbId ]
    const q = `
        UPDATE songbooks SET tabs = tabs || $1
        WHERE id = $2;
    `
    db.query(q, params)
    .then(() => res.json({success: true}))
    .catch(err => res.json({ error: err }))
})

// Delete tab from Songbooks
router.post("/delete-song-from-songbook", (req, res) => {

    const { tabId, sbId } = req.body
    const params = [ tabId, sbId ]
    const q = `
        UPDATE songbooks SET tabs = array_remove(tabs, $1)
        WHERE id = $2;
    `
    db.query(q, params)
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ error: err }))

})

export default router
