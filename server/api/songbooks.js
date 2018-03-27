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

// Delete Songbook
router.delete("/delete-songbook/:id", (req, res) => {
    console.log("check del: ", req.params.id);
    let q = `
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

export default router
