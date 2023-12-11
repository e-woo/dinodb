import { db } from "../db.js";

export const getAllTags = async (req, res) => {
  const q = `SELECT * FROM Tag`;

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const setTag = async (req, res) => {
  const { Activity_ID, Tag_ID } = req.body;
  const q = `INSERT INTO CATEGORIZED_BY (Activity_ID, Tag_ID) 
                        VALUES (?, ?)`;

  db.query(q, [Activity_ID, Tag_ID], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }

    return res.status(201).json(data);
  });
};

export const getTags = async (req, res) => {
  const { Activity_ID } = req.body;

  const q = `SELECT T.Tag_ID, T.Tag_Name
                FROM Categorized_By as CB
                LEFT JOIN Tag AS T ON CB.Tag_ID = T.Tag_ID
                WHERE CB.Activity_ID = ?`;

  db.query(q, [Activity_ID], (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};
