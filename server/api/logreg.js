import { Router } from 'express'
import db from "./db"
import { hashPassword, checkPassword } from "./hasher"

const router = Router()


// SIGN UP
router.post("/signup", (req, res) => {

    const { name, email, password } = req.body;

    hashPassword(password)
    .then(hashedPassword => {

        // Insert user data into DB

        const params = [ name, email, hashedPassword ]
        const q = `
        INSERT INTO users
        (username, email, hashedpass)
        VALUES
        ($1, $2, $3)
        RETURNING *
        `
        db.query(q, params)
        .then(result => {

            // Create user session
            req.session.authUser = {
                id: result[0].id,
                email,
                username: name,
                img: result[0].img
            }
            res.json(req.session.authUser)
        })
        .catch(err => res.json({ error: err }))
    })
})

router.post("/login", (req, res) => {

    const { email, password } = req.body;
    const q = `SELECT * FROM users WHERE email = $1`
    db.query(q, email)
        .then(result => {

            const { id, username, img, hashedpass } = result[0]

            checkPassword(password, hashedpass)
                .then(doesMatch => {
                    if (doesMatch) {

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
                .catch(err => res.json({ error: err }))
        })
        .catch(err => {
            res.json({
                error: true,
                message: "This email is not registered."
            })
        })
})

router.get("/logout", (req, res) => {

    delete req.session.authUser
    res.json({ success: true })
})

export default router
