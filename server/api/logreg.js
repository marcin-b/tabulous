import { Router } from 'express'
import db from "./db"
import { hashPassword, checkPassword } from "./hasher"

const router = Router()


// SIGN UP
router.post("/signup", (req, res) => {
    console.log("Inside Post reg", req.body, req.session);

    // Deconstruct req.body
    const { first, last, email, password } = req.body;
    hashPassword(password)
        .then(hashedPassword => {
            console.log("hash pass", hashedPassword);
        //     // Insert user data into DB
        //     const q = `INSERT INTO users
        //                 (first, last, email, hashedpass)
        //                 VALUES
        //                 ($1, $2, $3, $4)
        //                 RETURNING *`;
        //     const params = [ first, last, email, hashedPassword ];
        //
        //     db.query(q, params)
        //         .then(results => {
        //             console.log("USER CREATION SUCCESSFUL", results.rows);
        //
        //             // Create user session
        //             req.session.user = {
        //                 id: results.rows[0].id,
        //                 email,
        //                 username
        //
        //             };
        //             console.log("REGISTERED", req.session);
        //             res.json({ successful: true });
        //         })
        //         .catch(err => {
        //             console.log("REG ERROR: ", err);
        //             res.json({ error: "Email is already registered" })
        //         })
        res.json({ post: "was inside" })
        })


})

router.post("/login", (req, res) => {
    console.log("Inside Login POST", req.body);
    res.json({ msg: "been inside Login" })
})
export default router
