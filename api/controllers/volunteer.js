import { db } from "../db.js"

export const showVolunteering = (req, res) => {

    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, V.Location, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN VOLUNTEERING_OPPORTUNITY AS V NATURAL JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK
                WHERE EA.Activity_ID = ?`

    db.query(q, [req.body.Activity_ID], (err, data) => {
        if (err)
            return res.json(err)

        return res.status(200).json(data[0])
    });
}

export const get4Volunteer = (req, res) => {
    const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN VOLUNTEERING_OPPORTUNITY
                LIMIT 4`;

    db.query(q, (err, data) => {
        if (err)
            return res.json(err);

        return res.status(200).json(data);
    });
}

export const createVolunteering = async (req, res) => {
    const { activityType, name, description, schedule, img, interview, application, weekHours, tags, facultyType, fee, location, perks } = req.body;

    try {
        const q1 = `INSERT INTO EXTRACURRICULAR_ACTIVITY (Name, Type, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await db.promise().query(q1, [
            name, 
            activityType, 
            description, 
            fee === '' ? null : fee,
            schedule, 
            interview, 
            application, 
            weekHours === '' ? null : weekHours,
            facultyType, 
            img
        ]);
        const activityId = result[0].insertId;
        console.log(activityId);

        if (tags !== '') {
            const q2 = `INSERT INTO CATEGORIZED_BY (Activity_ID, Tag_ID) 
                        VALUES (?, ?)`;
            await db.promise().query(q2, [activityId, tags]);
        }

        if (perks !== '') {
            const q3 = `INSERT INTO EXTRACURRICULAR_ACTIVITY_PERKS (Activity_ID, Perk) 
                        VALUES (?, ?)`;
            await db.promise().query(q3, [activityId, perks]);
        }

        const q4 = `INSERT INTO VOLUNTEERING_OPPORTUNITY (Activity_ID, Location) 
                    VALUES (?, ?)`;
        await db.promise().query(q4, [activityId, location]);

        return res.status(201).json({ activityId: activityId });

    } catch (err) {
        return res.status(500).json(err);
    }
};
