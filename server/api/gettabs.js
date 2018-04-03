import { Router } from 'express'
import db from "./db"

const router = Router()

// Homemade sorting function
var sortResults = function(results) {
    let sortedTabs = {};
    results.forEach(tab => {

        // Convert "true/false" strings to boolean for better v-if compatibility
        if (tab.haslyrics === "true") {
            tab.haslyrics = true
        } else {
            tab.haslyrics = false
        }
        // Create new letter object if it doesn't exist
        if (!sortedTabs[tab.title.charAt(0).toUpperCase()]) {
            sortedTabs[tab.title.charAt(0).toUpperCase()] = [tab]
        } else {
            sortedTabs[tab.title.charAt(0).toUpperCase()].push(tab)
        }
    })
    return sortedTabs;
}

// GET all Tabs from Database
router.get("/tabs", (req, res, next) => {

    db.query(`SELECT * FROM tabs`)
        .then(results => {
            // Sort by Letters and then Alphabetically
            results = results.sort(function(a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            })
            res.json(sortResults(results))
        })
        .catch(err => res.json({ error: err }))
})

// Tab SEARCH
router.get("/tab-search/:val", (req, res) => {

    let q = `
        SELECT id, title, artist, type, haslyrics FROM tabs
        WHERE LOWER(title) LIKE $1||'%'
        ORDER BY title ASC
        LIMIT 5
    `
    db.query(q, req.params.val.toLowerCase())
        .then(results => {
            res.json(results)
        })
        .catch(err => res.json({ error: err }))
})

// GET single tab
router.get("/tab/:id", (req, res) => {

    db.query(`SELECT * FROM tabs WHERE id = $1`, req.params.id)
        .then(result => {
            res.json(result[0])
        })
        .catch(err => res.json({ error: err }))
})

export default router
