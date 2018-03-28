import { Router } from 'express'
import db from "./db"

const router = Router()

// POST new Songbook
router.post("/create-songbook", (req, res) => {
    const { ownerId, name } = req.body
    console.log("Inside New songbook", ownerId);
    const params = [ ownerId, name ]
    console.log("test:");
    const q = `
        INSERT INTO songbooks
        (owner_id, name)
        VALUES ($1, $2)
        RETURNING *
    `;
    db.query(q, params)
        .then((result) => {
            console.log("create new songbook DONE", result);
            res.json({newSongbook:result[0]})
        })
        .catch(err => {
            console.log("Error adding SB", err);
            res.json({ err })
        })
    // res.json({ got: "make" })
})


// Get Songbooks
router.get("/songbooks", (req, res) => {
    console.log("Req session at SB", req.session);
    console.log("Auth User", req.session.authUser.id);
    const q = `
        SELECT * FROM songbooks
        WHERE owner_id = $1
    `
    db.query(q, req.session.authUser.id)
    .then(songbooks => {
        console.log("GOT Ssongbooks:", songbooks);
        res.json( songbooks )
    })
    .catch(err => {
        console.log("Error getting BOoks", err);
        res.json(err)
    })
})

// GET one songbook
router.get("/songbook/:id", (req, res) => {
    console.log("Req session at SB", req.session);
    console.log("Auth User", req.session.authUser.id);
    const q = `
        SELECT * FROM songbooks
        WHERE id = $1
    `
    db.query(q, req.params.id)
    .then(songbook => {
        console.log("GOT Ssongbooks:", songbook);
        res.json( songbook[0] )
    })
    .catch(err => {
        console.log("Error getting BOoks", err);
        res.json(err)
    })
})

// Delete Songbook
router.delete("/delete-songbook/:id", (req, res) => {
    console.log("check del: ", req.params.id);
    const q = `
        DELETE FROM songbooks
        WHERE id = $1
    `
    db.query(q, req.params.id)
    .then(() => {
        res.json({
            result: "Delete DONE"
        })
    })
    .catch(err => {
        res.json({
            result: err
        })
    })

})

// Add tab to Songbooks
router.post("/add-tab-to-songbook", (req, res) => {
    console.log("inside adding tab: ", req.body);
    const { tabId, sbId } = req.body
    const params = [ tabId, sbId ]
    const q = `
        UPDATE songbooks SET tabs = tabs || $1
        WHERE id = $2;
    `
    db.query(q, params)
    .then(resp => {
        console.log("Resp? ", resp);
        res.json({ resp: "Tab was added" })

    })
    .catch(err => res.json({ Error: err }))

})

export default router
