import { sign } from "crypto";
import { db } from "../db.js";

export const showEvent = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Img_file_path, E.Name, E.Description, E.Type, E.Location, E.OnlineInPerson, E.SignUpInfo, E.Perks, E.Fee, E.Eligibility, E.Date_and_Time
                FROM EVENT AS E, EXTRACURRICULAR_ACTIVITY AS EA
                WHERE EA.Activity_ID = E.Activity_ID
                AND (E.Activity_ID = ? OR E.Name = ?)`;

  db.query(q, [req.body.Activity_ID, req.body.Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const get4Events = (req, res) => {
  const q = `SELECT EA.Activity_ID, E.Name, E.Description, EA.Img_file_path
                FROM EVENT AS E LEFT JOIN EXTRACURRICULAR_ACTIVITY AS EA ON EA.Activity_ID = E.Activity_ID
                LIMIT 4`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const createEvent = async (req, res) => {
  const {
    ucid,
    name,
    description,
    img,
    tags,
    facultyType,
    location,
    onlineInPerson,
    signUpInfo,
    fee,
    eligibility,
    dateTime,
    perks,
  } = req.body;

  try {
    const q1 = `INSERT INTO EXTRACURRICULAR_ACTIVITY (Name, Type, Description, Fee, Schedule, InterviewRequired, ApplicationRequired, WeekCommitmentHour, Faculty_Name, Img_file_path) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await db
      .promise()
      .query(q1, [
        name,
        "event",
        description ?? "",
        fee === "" ? null : fee,
        "",
        "",
        "",
        null,
        facultyType ?? "",
        img,
      ]);
    const activityId = result[0].insertId;

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
    const q4 = `INSERT INTO EVENT (Activity_ID, Name, Description, Type, Location, OnlineInPerson, SignUpInfo, Perks, Fee, Eligibility, Date_and_Time) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db
      .promise()
      .query(q4, [
        activityId,
        name,
        description,
        "event",
        location,
        onlineInPerson,
        signUpInfo,
        perks,
        fee === "" ? null : fee,
        eligibility,
        dateTime === "" ? null : dateTime,
      ]);

    const q5 = `INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
                    VALUES (?, ?, ?)`;
    await db.promise().query(q5, [ucid, "Event Organizer", activityId]);

    return res.status(201).json({ activityId: activityId });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const createEvent2 = async (req, res) => {
  const {
    id,
    name,
    description,
    location,
    onlineInPerson,
    signUpInfo,
    fee,
    eligibility,
    dateTime,
    perks,
  } = req.body;

  try {
    const q = `INSERT INTO EVENT (Activity_ID, Name, Description, Type, Location, OnlineInPerson, SignUpInfo, Perks, Fee, Eligibility, Date_and_Time) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await db
      .promise()
      .query(q, [
        id,
        name,
        description,
        "event",
        location,
        onlineInPerson,
        signUpInfo,
        perks,
        fee === "" ? null : fee,
        eligibility,
        dateTime === "" ? null : dateTime,
      ]);

    return res.status(200).json({ message: "Event successfully created" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const editEvent = async (req, res) => {
  const {
    name,
    description,
    perks,
    location,
    onlineInPerson,
    signUpInfo,
    fee,
    eligibility,
    dateTime,
  } = req.body;

  try {
    const q = `UPDATE EVENT
                    SET Description = ?, Location = ?, OnlineInPerson = ?, SignUpInfo = ?, Perks = ?, Fee = ?, Eligibility = ?, Date_and_Time = ?
                    WHERE Name = ?`;
    await db
      .promise()
      .query(q, [
        description,
        location,
        onlineInPerson,
        signUpInfo,
        perks,
        fee === "" ? null : fee,
        eligibility,
        dateTime === "" ? null : dateTime,
        name,
      ]);

    return res.status(201).json({ Name: name });
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

export const getID = async (req, res) => {
  const { Name } = req.body;

  try {
    const q = `SELECT Activity_ID
                    FROM EVENT
                    WHERE Name = ?`;

    db.query(q, [Name], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data[0]);
    });
  } catch {
    return res.status(500).json(err);
  }
};

export const getClubID = async (req, res) => {
  const { Name } = req.body;

  try {
    const q = `SELECT DISTINCT C.Activity_ID
                    FROM CLUB AS C, EVENT AS E, PROGRAM AS P, VOLUNTEERING_OPPORTUNITY AS V
                    WHERE Name = ?
                    AND (C.Activity_ID = E.Activity_ID
                        OR P.Activity_ID = E.Activity_ID
                        OR V.Activity_ID = E.Activity_ID)`;

    db.query(q, [Name], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data[0]);
    });
  } catch {
    return res.status(500).json(err);
  }
};

export const deleteEvent = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    await db
      .promise()
      .query(`DELETE FROM ACTIVITY_EXEC WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM EVENT WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM EXTRACURRICULAR_ACTIVITY WHERE Activity_ID = ?`, [
        Activity_ID,
      ]);

    return res.status(200).json({ message: "Event successfully deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteEvent2 = async (req, res) => {
  const { Name } = req.body;

  try {
    await db.promise().query(`DELETE FROM EVENT WHERE Name = ?`, [Name]);

    return res.status(200).json({ message: "Event successfully deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinEvent = async (req, res) => {
  const { UCID, Activity_ID, Event_name, Sign_up } = req.body;

  try {
    const q = `INSERT INTO ATTENDS (Activity_ID, Student_UCID, Event_Name, Sign_Up)
                      VALUES (?, ?, ?, ?)`;
    db.query(q, [Activity_ID, UCID, Event_name, Sign_up]);

    return res.status(201).json({ Activity_ID: Activity_ID });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const leaveEvent = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `DELETE FROM ATTENDS
                      WHERE Student_UCID = ? AND Activity_ID = ?`;
    db.query(q, [UCID, Activity_ID]);

    return res.status(201).json({ message: "Successfully left event" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinedEvents = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
               FROM ATTENDS AS MO 
               JOIN EVENT AS C ON MO.Activity_ID = C.Activity_ID 
               JOIN EXTRACURRICULAR_ACTIVITY AS EA ON C.Activity_ID = EA.Activity_ID
               WHERE MO.Student_UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const execEvents = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
    FROM ACTIVITY_EXEC AS E 
    JOIN EXTRACURRICULAR_ACTIVITY AS EA ON E.Activity_ID = EA.Activity_ID
    JOIN EVENT AS C ON E.Program_ID = C.Activity_ID
    WHERE E.UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};
