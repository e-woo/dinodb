import { db } from "../db.js";
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