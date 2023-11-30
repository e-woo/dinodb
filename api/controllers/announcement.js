import { db } from "../db.js";
export const postAnnouncement = async (req, res) => {
	const { id, title, body, author, date } = req.body;

	try {
	  let q = 'SELECT title FROM announcement';
	  const titles = [];
	  await db.promise().query(q, (err, data) => {
		if (err)
		  return res.json(err);
		data.forEach(i => titles.push(i.title))
	  });
	//   await new Promise(r => setTimeout(r, 500));
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

export const getAnnouncementExecs = async (req, res) => {
  const { title } = req.body;
  try {
	const q = `SELECT UCID
			  FROM announcement, activity_exec
			  WHERE announcement.Title = ?
			  AND announcement.Activity_ID = activity_exec.Activity_ID`;
	db.query(q, [title], (err, data) => {
		if (err)
			return res.json(err);
		return res.status(200).json(data);
	})
  } catch (err) {
	return res.status(500).json(err);
  }
}

export const updateAnnouncement = async (req, res) => {
	const { title, announcement } = req.body;
	try {
		const q = 'UPDATE announcement SET Announcement = ? WHERE Title = ?'
		await db.promise().query(q, [announcement, title]);
        return res.status(200).json({message: 'Announcement updated!', status: 200});
	} catch (err) {
		return res.status(500).json(err);
	}
}

export const getAnnouncement = async (req, res) => {
	const { title } = req.body;
	try {
		const q = `SELECT Activity_ID, Title, Announcement, Author, Date, Img_file_path
					FROM announcement NATURAL JOIN extracurricular_activity
					WHERE announcement.Title = ?`
		db.query(q, [title], (err, data) => {
			if (err)
				return res.json(err);
			return res.status(200).json(data);
		})
	} catch (err) {
		return res.status(500).json(err);
	}

}