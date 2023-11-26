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

        return res.status(200).json(data);
    });
}

export const createEvent = async (req, res) => {
    const { activityType, name, description, schedule, img, interview, application, weekHours, tags, facultyType, fee, discord, instagram, perks } = req.body;

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

        const q4 = `INSERT INTO CLUB (Activity_ID, Discord, Instagram) 
                    VALUES (?, ?, ?)`;
        await db.promise().query(q4, [activityId, discord, instagram]);

        return res.status(201).json({ activityId: activityId });

    } catch (err) {
        return res.status(500).json(err);
    }
};

