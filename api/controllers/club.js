import { db } from "../db.js";

export const showClub = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Fee, EA.Schedule, EA.InterviewRequired, EA.ApplicationRequired, EA.WeekCommitmentHour, EA.Faculty_Name, EA.Img_file_path, C.Discord, C.Instagram, PK.Perk
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN CLUB AS C NATURAL JOIN EXTRACURRICULAR_ACTIVITY_PERKS AS PK
                WHERE EA.Activity_ID = ?`;

  db.query(q, [req.body.Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const get4Clubs = (req, res) => {
  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
                FROM EXTRACURRICULAR_ACTIVITY AS EA NATURAL JOIN CLUB
                LIMIT 4`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const createClub = async (req, res) => {
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
    discord,
    instagram,
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

    const q4 = `INSERT INTO CLUB (Activity_ID, Discord, Instagram) 
                    VALUES (?, ?, ?)`;
    await db.promise().query(q4, [activityId, discord, instagram]);

    const q5 = `INSERT INTO ACTIVITY_EXEC (UCID, PositionName, Activity_ID)
                    VALUES (?, ?, ?)`;
    await db.promise().query(q5, [ucid, "Club Executive", activityId]);

    return res.status(201).json({ activityId: activityId });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const editClub = async (req, res) => {
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
    discord,
    instagram,
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
    }

    if (perks !== "") {
      const q3 = `UPDATE EXTRACURRICULAR_ACTIVITY_PERKS
                        SET Perk = ?
                        WHERE Activity_ID = ?`;
      await db.promise().query(q3, [perks, id]);
    }

    const q4 = `UPDATE CLUB
                    SET Discord = ?, Instagram = ?
                    WHERE Activity_ID = ?`;
    await db.promise().query(q4, [discord, instagram, id]);

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

export const getMembers = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    const q = `SELECT Member_UCID
                    FROM MEMBER_OF
                    WHERE Club_ID = ?`;

    db.query(q, [Activity_ID], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deleteClub = async (req, res) => {
  const { Activity_ID } = req.body;

  try {
    await db
      .promise()
      .query(`DELETE FROM ACTIVITY_EXEC WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM CLUB WHERE Activity_ID = ?`, [Activity_ID]);

    await db
      .promise()
      .query(`DELETE FROM EXTRACURRICULAR_ACTIVITY WHERE Activity_ID = ?`, [
        Activity_ID,
      ]);

    return res.status(200).json({ message: "Club successfully deleted" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinClub = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `INSERT INTO MEMBER_OF (Club_ID, Member_UCID)
                    VALUES (?, ?)`;
    db.query(q, [Activity_ID, UCID]);

    return res.status(201).json({ Activity_ID: Activity_ID });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const leaveClub = async (req, res) => {
  const { UCID, Activity_ID } = req.body;

  try {
    const q = `DELETE FROM MEMBER_OF
                    WHERE Member_UCID = ? AND Club_ID = ?`;
    db.query(q, [UCID, Activity_ID]);

    return res.status(201).json({ message: "Successfully left club" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const joinedClubs = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
               FROM MEMBER_OF AS MO 
               JOIN CLUB AS C ON MO.Club_ID = C.Activity_ID 
               JOIN EXTRACURRICULAR_ACTIVITY AS EA ON C.Activity_ID = EA.Activity_ID
               WHERE MO.Member_UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    console.log(data); // Log the data here
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const execClubs = async (req, res) => {
  const { UCID } = req.body;

  const q = `SELECT EA.Activity_ID, EA.Name, EA.Description, EA.Img_file_path
    FROM ACTIVITY_EXEC AS E 
    JOIN EXTRACURRICULAR_ACTIVITY AS EA ON E.Activity_ID = EA.Activity_ID
    WHERE E.UCID = ?`;

  try {
    const [data] = await db.promise().query(q, [UCID]);
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const getExecClubs = async (req, res) => {
  const { id } = req.body;

  try {
    const q = "SELECT UCID FROM activity_exec WHERE ACTIVITY_ID = ?";
    db.query(q, [id], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json(data);
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const postAnnouncement = async (req, res) => {
  const { id, title, body, author, date } = req.body;

  try {
    const q =
      "INSERT INTO announcement (Activity_ID, Title, Announcement, Author, Date) VALUES (?, ?, ?, ?, ?)";

    db.query(q, [id, title, body, author, date]);
    return res
      .status(201)
      .json({ message: "Successfully posted announcement!", status: 201 });
  } catch (err) {
    return res.status(500).json(err);
  }
};
