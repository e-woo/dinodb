import { db } from "../db.js"

export const editProfile = async (req, res) => {
    const {ucid, bio, fName, lName} = req.body;
    const q = 'UPDATE student SET Bio = ?, FName = ?, LName = ? WHERE UCID = ?';
    try {
        await db.promise().query(q, [bio, fName, lName, ucid])
        return res.status(200).json({message: 'Profile edit successful.', status: 200});
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const changePassword = async (req, res) => {
    const {ucid, password} = req.body;
    const q = 'UPDATE student SET Password = ? WHERE UCID = ?';
    try {
        await db.promise().query(q, [password, ucid]);
        return res.status(200).json({message: 'Password updated!', status: 200});
    } catch (err) {
        return res.status(500).json(err);
    }
}