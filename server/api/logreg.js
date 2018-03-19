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

    }
})

router.post("/login", (req, res) => {
    console.log("Inside Login POST", req.body);

    // Destructure req.body
    const { email, password } = req.body;

    // Query DB

    const q = `SELECT * FROM users WHERE email = $1`
    db.query(q, email)
        .then(result => {
            // console.log("Login Query res: ", result[0]);
            // Destructure result
            const { id, username, img, hashedpass } = result[0]
            // console.log("destructr: ", id, username, img, hashedpass);
            checkPassword(password, hashedpass)
                .then(doesMatch => {
                    if (doesMatch) {
                        console.log("gutes PW? ", doesMatch, req.url);
                        // Create User Session
                        req.session.authUser = {
                            username,
                            email,
                            id,
                            img,
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

        })
        .catch(err => {
            console.log("CHECK PASS", err);
            res.status(401).json({
                error: true,
                message: "This email is not registered."
            })

        })
})

router.post("/logout", (req, res) => {
    console.log("LOGOUT SESSION BEFORE: ", req.session.authUser);
    delete req.session.authUser
    console.log("LOGOUT SESSION: ", req.session);
    res.json({ successful: true })
})
// router.get('*', function(req, res) {
//     if(!req.session.user && req.url != "/welcome") {
//         console.log("no Session user");
//         res.redirect("/welcome")
//     } else {
//         console.log("session", req.session.user);
//         res.redirect("/")
//     }
// });

export default router
