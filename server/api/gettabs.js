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
        // console.log("sortedTabs", sortedTabs);
    })
    return sortedTabs;
}

// GET all Tabs from Database
router.get("/tabs", (req, res, next) => {
    console.log("Inside GET tabs");
    db.query(`SELECT * FROM tabs`)
        .then(results => {
            //console.log("get tabs Result:", results[0]);
            // Sort by Letters and then Alphabetically
            results = results.sort(function(a, b) {
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
            })
            res.json(sortResults(results))
            // .sort(function(a, b) {
            //     return parseFloat(b.id) - parseFloat(a.id)
            // })
        })
        .catch(err => res.json({ response: "Error: " + err }))
})

// GET single tab
router.get("/tab/:id", (req, res, next) => {
    console.log("Inside GET SINGLE TAB");
    db.query(`SELECT * FROM tabs WHERE id = $1`, [ req.params.id ])
        .then(result => {
            //console.log("get tab:", result);
            res.json(result)
        })
        .catch(err => res.json({ response: "Error: " + err }))
})
export default router
