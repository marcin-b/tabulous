import { Router } from 'express'
import db from "./db"
import { hashPassword, checkPassword } from "./hasher"

const router = Router()


// SIGN UP
router.post("/signup", (req, res) => {
    console.log("Inside Post reg", req.body, req.session);

    // Deconstruct req.body
    const { name, email, password } = req.body;

    // Check for password if browser doesn't support "required" atrr.
    if (!password) {
        const data = {
            // data: {
                error: {
                    code: 23502,
                    column: "password"
                // }
            }
        }
        console.log("Inside no pass ", data);
        res.json(data)
    } else {
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
                req.session.user = {
                    id: result[0].id,
                    email,
                    name

                };
                console.log("REGISTERED", req.session);
                res.json({ successful: true });
            })
            .catch(err => {
                console.log("REG ERROR: ", err);
                res.json({ error: err })
            })
        })

    }


})

router.post("/login", (req, res) => {
    console.log("Inside Login POST", req.body);
    res.json({ msg: "been inside Login" })
})
export default router
