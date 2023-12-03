import { db } from "../db.js";

export const showProgram = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, P.Website, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA LEFT JOIN PROGRAM AS P ON EA.Activity_ID = P.Activity_ID
                LEFT JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK ON EA.Activity_ID = PK.Activity_ID
                WHERE EA.Activity_ID LIKE ?;`;

  db.query(q, [req.body.Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const getOrganization = (req, res) => {
  const q = `SELECT O.Org_Name
              FROM PROGRAM AS P LEFT JOIN INVITES AS I ON P.Activity_ID = I.Activity_ID
              LEFT JOIN ORGANIZATION AS O ON I.Org_ID = O.Org_ID
              WHERE P.Activity_ID = ?`;
  db.query(q, [req.body.Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  })
}

export const get4Programs = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN PROGRAM
                LIMIT 4`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const createProgram = async (req, res) => {
  const {
    ucid,
    activityType,
    name,
    description,
    schedule,
    img,
    interview,
    application,
    weekHours,
    tags,
    facultyType,
    fee,
    website,
    perks,
    organization,
  } = req.body;

  try {
    const q1 = `INSERT INTO EXTRACURRICULAR_ACTIVITY (Name, Type, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await db
      .promise()
      .query(q1, [
        name,
        activityType,
        description ?? "",
        fee === "" ? null : fee,
        schedule ?? "",
        interview ?? "",
        application ?? "",
        weekHours === "" ? null : weekHours,
        facultyType ?? "",
        img,
      ]);
    const activityId = result[0].insertId;
    console.log(activityId);

    if (tags !== "") {
      const q2 = `INSERT INTO CATEGORIZED_BY (Activity_ID, Tag_ID) 
                        VALUES (?, ?)`;
      await db.promise().query(q2, [activityId, tags]);
    }

    if (perks !== "") {
      const q3 = `INSERT INTO EXTRACURRICULAR_ACTIVITY_PERKS (Activity_ID, Perk) 
                        VALUES (?, ?)`;
      await db.promise().query(q3, [activityId, perks]);
    }

    if (organization !== '') {
      const q6 = `INSERT INTO INVITES (Activity_ID, Org_ID)
                  VALUES (?, ?)`
      await db.promise().query(q6, [activityId, organization]);
    }

    const q4 = `INSERT INTO PROGRAM (Activity_ID, Website) 
                    VALUES (?, ?)`;
    await db.promise().query(q4, [activityId, website]);

    const q5 = `INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
        VALUES (?, ?, ?)`;
    await db.promise().query(q5, [ucid, "Program Manager", activityId]);

    return res.status(201).json({ activityId: activityId });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const editProgram = async (req, res) => {
  const {
    id,
    name,
    description,
    schedule,
    img,
    interview,
    application,
    weekHours,
    tags,
    facultyType,
    fee,
    website,
    perks,
  } = req.body;

  try {
    const q1 = `UPDATE EXTRACURRICULAR_ACTIVITY 
                    SET Name = ?, Description = ?, Fee = ?, Schedule = ?, InterviewRequired = ?, ApplicationRequired = ?, WeekCommitmentHour = ?, Faculty_Name = ?, Img_file_path = ?
                    WHERE Activity_ID = ?`;

    await db
      .promise()
      .query(q1, [
        name,
        description ?? "",
        fee === "" ? null : fee,
        schedule ?? "",
        interview ?? "",
        application ?? "",
        weekHours === "" ? null : weekHours,
        facultyType ?? "",
        img,
        id,
      ]);

    if (tags !== "") {
      const q2 = `UPDATE CATEGORIZED_BY
                        SET Tag_ID = ?
                        WHERE Activity_ID = ?`;
      await db.promise().query(q2, [tags, id]);
    } else {
      const q2 = `INSERT INTO CATEGORIZED_BY (Activity_ID, Tag_ID) 
                        VALUES (?, ?)`;
      await db.promise().query(q2, [activityId, tags]);
    }

    if (perks !== "") {
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
      if (err) return res.json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteProgram = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    await db
      .promise()
      .query(`DELETE FROM ACTIVITY_EXEC WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM PROGRAM WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM EXTRACURRICULAR_ACTIVITY WHERE Activity_ID = ?`, [
        Activity_ID,
      ]);

    return res.status(200).json({ message: "Program successfully deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getMembers = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    const q = `SELECT Student_UCID
                    FROM PART_OF
                    WHERE Program_ID = ?`;

    db.query(q, [Activity_ID], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinProgram = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `INSERT INTO PART_OF (Program_ID, Student_UCID)
                    VALUES (?, ?)`;
    db.query(q, [Activity_ID, UCID]);

    return res.status(201).json({ Activity_ID: Activity_ID });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const leaveProgram = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `DELETE FROM PART_OF
                    WHERE Student_UCID = ? AND Program_ID = ?`;
    db.query(q, [UCID, Activity_ID]);

    return res.status(201).json({ message: "Successfully left program" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinedPrograms = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
               FROM PART_OF AS MO 
               JOIN PROGRAM AS C ON MO.Program_ID = C.Activity_ID 
               JOIN EXTRACURRICULAR_ACTIVITY AS EA ON C.Activity_ID = EA.Activity_ID
               WHERE MO.Student_UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const execPrograms = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
    FROM ACTIVITY_EXEC AS E 
    JOIN EXTRACURRICULAR_ACTIVITY AS EA ON E.Activity_ID = EA.Activity_ID
    JOIN PROGRAM AS C ON E.Activity_ID = C.Activity_ID
    WHERE E.UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};
