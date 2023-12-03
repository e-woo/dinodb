import { db } from "../db.js";

export const showInfo = (req, res) => {
  // Get user profile data
  const q = "SELECT * FROM student WHERE UCID = ?";

  db.query(q, [req.body.UCID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const showInfoSup = (req, res) => {
  // Get user profile data
  const q = "SELECT * FROM supervisor WHERE Supervisor_ID = ?";

  db.query(q, [req.body.Supervisor_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data[0]);
  });
};

export const showClubs = (req, res) => {
  // Get the clubs the user is in
  const q = `SELECT MO.Club_ID, EA.Name, EA.Description
                FROM STUDENT AS S, MEMBER_OF AS MO, EXTRACURRICULAR_ACTIVITY AS EA 
                WHERE MO.Member_UCID = S.UCID
                AND EA.Activity_ID = MO.Club_ID
                AND S.UCID = ?`;

  db.query(q, [req.body.UCID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
