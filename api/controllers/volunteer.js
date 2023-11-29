import { db } from "../db.js";

export const showVolunteering = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, V.Location, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN VOLUNTEERING_OPPORTUNITY AS V NATURAL JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK
                WHERE EA.Activity_ID = ?`;

  db.query(q, [req.body.Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const get4Volunteer = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN VOLUNTEERING_OPPORTUNITY
                LIMIT 4`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const createVolunteering = async (req, res) => {
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
    location,
    perks,
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

    const q4 = `INSERT INTO VOLUNTEERING_OPPORTUNITY (Activity_ID, Location) 
                    VALUES (?, ?)`;
    await db.promise().query(q4, [activityId, location]);

    const q5 = `INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
        VALUES (?, ?, ?)`;
    await db.promise().query(q5, [ucid, "Volunteer Coordinator", activityId]);

    return res.status(201).json({ activityId: activityId });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const editVolunteer = async (req, res) => {
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
    location,
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
    } else {
      const q3 = `INSERT INTO EXTRACURRICULAR_ACTIVITY_PERKS (Activity_ID, Perk) 
                        VALUES (?, ?)`;
      await db.promise().query(q3, [activityId, perks]);
    }

    const q4 = `UPDATE VOLUNTEERING_OPPORTUNITY
                    SET Location = ?
                    WHERE Activity_ID = ?`;
    await db.promise().query(q4, [location, id]);

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

export const deleteVolunteer = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    await db
      .promise()
      .query(`DELETE FROM ACTIVITY_EXEC WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM VOLUNTEERING_OPPORTUNITY WHERE Activity_ID = ?`, [
        Activity_ID,
      ]);

    await db
      .promise()
      .query(`DELETE FROM EXTRACURRICULAR_ACTIVITY WHERE Activity_ID = ?`, [
        Activity_ID,
      ]);

    return res
      .status(200)
      .json({ message: "Volunteering opportunity successfully deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinVolunteer = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `INSERT INTO VOLUNTEERS (Volunteer_ID, Student_UCID)
                      VALUES (?, ?)`;
    db.query(q, [Activity_ID, UCID]);

    return res.status(201).json({ Activity_ID: Activity_ID });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const leaveVolunteer = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `DELETE FROM VOLUNTEERS
                      WHERE Student_UCID = ? AND Volunteer_ID = ?`;
    db.query(q, [UCID, Activity_ID]);

    return res.status(201).json({ message: "Successfully left volunteering" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinedVolunteer = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
               FROM VOLUNTEERS AS MO 
               JOIN VOLUNTEERING_OPPORTUNITY AS C ON MO.Volunteer_ID = C.Activity_ID 
               JOIN EXTRACURRICULAR_ACTIVITY AS EA ON C.Activity_ID = EA.Activity_ID
               WHERE MO.Student_UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const execVolunteer = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
    FROM ACTIVITY_EXEC AS E 
    JOIN EXTRACURRICULAR_ACTIVITY AS EA ON E.Activity_ID = EA.Activity_ID
    JOIN VOLUNTEERING_OPPORTUNITY AS C ON E.Program_ID = C.Activity_ID
    WHERE E.UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};
