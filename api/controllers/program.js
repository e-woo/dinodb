import { db } from "../db.js"

export const showProgram = (req, res) => {

    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, P.Website, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA LEFT JOIN PROGRAM AS P ON EA.Activity_ID = P.Activity_ID
                LEFT JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK ON EA.Activity_ID = PK.Activity_ID
                WHERE EA.Activity_ID LIKE ?;`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}

export const get4Programs = (req, res) => {
    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN PROGRAM
                LIMIT 4`;

    db.query(q, (err, data) => {
        if (err)
            return res.json(err);

        return res.status(200).json(data);
    });
}
