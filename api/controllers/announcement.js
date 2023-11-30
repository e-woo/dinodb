import { db } from "../db.js";
export const postAnnouncement = async (req, res) => {
    const { id, title, body, author, date } = req.body;
    const titles = [];

    try {
      let q = 'SELECT title FROM announcement';
      const titles = [];
      db.query(q, (err, data) => {
        if (err)
          return res.json(err);
        data.forEach(i => titles.push(i.title))
      });
      await new Promise(r => setTimeout(r, 500));
      console.log(titles.includes(title));
      if (titles.includes(title))
        return res.status(403).json( {status: 403, message: 'Title already exists!'} );
      q = "INSERT INTO announcement (Activity_ID, Title, Announcement, Author, Date) VALUES (?, ?, ?, ?, ?)";
  
      db.query(q, [id, title, body, author, date]);
      return res
        .status(201)
        .json({ message: "Successfully posted announcement!", status: 201 });
    } catch (err) {
      return res.status(500).json(err);
    }
};

export const getAnnouncements = async (req, res) => {
    const q = `SELECT Activity_ID, Title, Announcement, Author, Date, Img_file_path
                FROM announcement NATURAL JOIN extracurricular_activity
                ORDER BY Date DESC`

    db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        return res.status(200).json(data);
    })
}