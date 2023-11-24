import { db } from "../db.js"

export const showClub = (req, res) => {

    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, C.Discord, C.Instagram, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN CLUB AS C NATURAL JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK
                WHERE EA.Activity_ID = ?`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}

export const get4Clubs = (req, res) => {
    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN CLUB
                LIMIT 4`;

    db.query(q, (err, data) => {
        if (err)
            return res.json(err);

        return res.status(200).json(data);
    });
}

