import { db } from "../db.js"

export const showEvent = (req, res) => {

    const q = `SELECT EA.Activity_ID, E.Name, E.Description, E.Type, E.Location, E.Date_and_Time
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN EVENT AS E
                WHERE EA.Activity_ID = ?`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}
