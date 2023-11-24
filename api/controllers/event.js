import { db } from "../db.js"

export const showEvent = (req, res) => {

    const q = `SELECT EA.Activity_ID, EA.Img_file_path, E.Name, E.Description, E.Type, E.Location, E.Date_and_Time
                FROM EXTRACURRICULAR_ACTIVITY AS EA, EVENT AS E
                WHERE EA.Activity_ID = ?
                AND EA.Activity_ID = E.Activity_ID`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}

export const get4Events = (req, res) => {
    const q = `SELECT EA.Activity_ID, E.Name, E.Description, EA.Img_file_path
                FROM EVENT AS E LEFT JOIN EXTRACURRICULAR_ACTIVITY AS EA ON EA.Activity_ID = E.Activity_ID
                LIMIT 4`;

    db.query(q, (err, data) => {
        if (err)
            return res.json(err);

        console.log(data)
        return res.status(200).json(data);
    });
}
