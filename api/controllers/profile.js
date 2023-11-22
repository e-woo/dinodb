import { db } from "../db.js"

export const show = (req, res) => {
    // Get user profile data
    const q = "SELECT * FROM student WHERE UCID = ?"

    db.query(q, [req.body.UCID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    })

    // Get the clubs the user is in

    // Get the volunteering the user is in

    // Get the programs the user is in

    // Get the events the user has gone to
}