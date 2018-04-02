import { Router } from 'express'
import db from "./db"
import { hashPassword, checkPassword } from "./hasher"

const router = Router()


// SIGN UP
router.post("/signup", (req, res) => {
    console.log("Inside Post reg", req.body, req.session);

    // Deconstruct req.body
    const { name, email, password } = req.body;

    hashPassword(password)
    .then(hashedPassword => {
        console.log("hash pass", hashedPassword);

        // Insert user data into DB

        // Parameters
        const params = [ name, email, hashedPassword ];
        // Query
        const q = `
        INSERT INTO users
        (username, email, hashedpass)
        VALUES
        ($1, $2, $3)
        RETURNING *
        `;
        db.query(q, params)
        .then(result => {
            console.log("User creation Done", result);

            // Create user session
            req.session.authUser = {
                id: result[0].id,
                email,
                username: name,
                img: result[0].img
            };
            console.log("REGISTERED", req.session);
            res.json(req.session.authUser);
        })
        .catch(err => {
            console.log("REG ERROR: ", err);
            res.json({ error: err })
        })
    })
})

router.post("/login", (req, res) => {
    console.log("Login POST for user", req.body.email);

    // Destructure req.body
    const { email, password } = req.body;

    // Query DB
    const q = `SELECT * FROM users WHERE email = $1`
    db.query(q, email)
        .then(result => {
            console.log("Credential Check...");
            // Destructure result
            const { id, username, img, hashedpass } = result[0]
            // console.log("destructr: ", id, username, img, hashedpass);
            checkPassword(password, hashedpass)
                .then(doesMatch => {
                    if (doesMatch) {
                        console.log("Correct Password? ", doesMatch);
                        // Create User Session
                        req.session.authUser = {
                            username,
                            email,
                            id,
                            img
                        }
                        console.log("Login AUTH: ", req.session.authUser);
                        res.json(req.session.authUser)
                    }
                    else {
                        res.json({
                            error: true,
                            message: "Wrong password."
                        })
                    }
                })
                .catch(err => console.log("test catch", err))

        })
        .catch(err => {
            console.log("CHECK PASS", err);
            res.json({
                error: true,
                message: "This email is not registered."
            })

        })
})

router.get("/logout", (req, res) => {
    console.log("LOGOUT SESSION BEFORE: ", req.session.authUser);
    delete req.session.authUser
    console.log("LOGOUT SESSION: ", req.session);
    res.json({ successful: true })
})

export default router
