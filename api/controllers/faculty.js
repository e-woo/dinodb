import { db } from "../db.js";

export const getFaculties = async (req, res) => {
    const q = `SELECT Name FROM Faculty`;

    db.query(q, (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    })
}