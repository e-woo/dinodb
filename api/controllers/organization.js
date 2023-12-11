import { db } from "../db.js";

export const getOrganizations = async (req, res) => {
    const q = `SELECT Org_ID, Org_Name FROM Organization`;

    db.query(q, (error, data) => {
        if (error) return res.json(error);

        return res.status(200).json(data);
    })
}