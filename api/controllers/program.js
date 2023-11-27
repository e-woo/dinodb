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

export const createProgram = async (req, res) => {
    const { activityType, name, description, schedule, img, interview, application, weekHours, tags, facultyType, fee, website, perks } = req.body;

    try {
        const q1 = `INSERT INTO EXTRACURRICULAR_ACTIVITY (Name, Type, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const result = await db.promise().query(q1, [
            name, 
            activityType, 
            description ?? '', 
            fee === '' ? null : fee,
            schedule ?? '', 
            interview ?? '', 
            application ?? '', 
            weekHours === '' ? null : weekHours,
            facultyType ?? '', 
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

        const q4 = `INSERT INTO PROGRAM (Activity_ID, Website) 
                    VALUES (?, ?)`;
        await db.promise().query(q4, [activityId, website]);

        const q5 = `INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
        VALUES (?, ?, ?)`;
        await db.promise().query(q5, [ucid, 'Program Manager', activityId]);

        return res.status(201).json({ activityId: activityId });

    } catch (err) {
        return res.status(500).json(err);
    }
};

export const editProgram = async (req, res) => {
    const { id, name, description, schedule, img, interview, application, weekHours, tags, facultyType, fee, website, perks } = req.body;

    try {
        const q1 = `UPDATE EXTRACURRICULAR_ACTIVITY 
                    SET Name = ?, Description = ?, Fee = ?, Schedule = ?, InterviewRequired = ?, ApplicationRequired = ?, WeekCommitmentHour = ?, Faculty_Name = ?, Img_file_path = ?
                    WHERE Activity_ID = ?`;

        await db.promise().query(q1, [
            name, 
            description ?? '', 
            fee === '' ? null : fee,
            schedule ?? '', 
            interview ?? '', 
            application ?? '', 
            weekHours === '' ? null : weekHours,
            facultyType ?? '', 
            img,
            id
        ]);

        if (tags !== '') {
            const q2 = `UPDATE CATEGORIZED_BY
                        SET Tag_ID = ?
                        WHERE Activity_ID = ?`;
            await db.promise().query(q2, [tags, id]);
        } else {
            const q2 = `INSERT INTO CATEGORIZED_BY (Activity_ID, Tag_ID) 
                        VALUES (?, ?)`;
            await db.promise().query(q2, [activityId, tags]);
        }

        if (perks !== '') {
            const q3 = `UPDATE EXTRACURRICULAR_ACTIVITY_PERKS
                        SET Perk = ?
                        WHERE Activity_ID = ?`;
            await db.promise().query(q3, [perks, id]);
        }

        const q4 = `UPDATE PROGRAM
                    SET Website = ?
                    WHERE Activity_ID = ?`;
        await db.promise().query(q4, [website, id]);

        return res.status(201).json({ activityId: id });

    } catch (err) {
        return res.status(500).json(err);
    }
};

export const getExecs = async (req, res) => {
    const { Activity_ID } = req.body;

    try {
        const q = `SELECT UCID
                    FROM ACTIVITY_EXEC
                    WHERE Activity_ID = ?`;
        
        db.query(q, [Activity_ID], (err, data) => {
            if (err)
                return res.json(err);

            return res.status(200).json(data);
        });

    } catch (err) {
        return res.status(500).json(err);
    }
}

export const deleteProgram = async (req, res) => {
    const { Activity_ID } = req.body;

    try {
        await db.promise().query(`DELETE FROM ACTIVITY_EXEC WHERE Activity_ID = ?`, [Activity_ID]);

        await db.promise().query(`DELETE FROM PROGRAM WHERE Activity_ID = ?`, [Activity_ID]);

        await db.promise().query(`DELETE FROM EXTRACURRICULAR_ACTIVITY WHERE Activity_ID = ?`, [Activity_ID]);

        return res.status(200).json({ message: "Program successfully deleted" });

    } catch (err) {
        return res.status(500).json(err);
    }
}
