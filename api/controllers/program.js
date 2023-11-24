import { db } from "../db.js"

export const showProgram = (req, res) => {

    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, P.Website, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN PROGRAM AS P NATURAL JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK
                WHERE EA.Activity_ID = ?`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}
