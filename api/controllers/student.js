import { db } from "../db.js";
import bcrypt from "bcryptjs";

export const editProfile = async (req, res) => {
  const { id, bio, fName, lName } = req.body;
  const q = "UPDATE student SET Bio = ?, FName = ?, LName = ? WHERE UCID = ?";
  try {
    await db.promise().query(q, [bio, fName, lName, id]);
    return res
      .status(200)
      .json({ message: "Profile edit successful.", status: 200 });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const editSupProfile = async (req, res) => {
  const { id, fName, lName } = req.body;
  const q =
    "UPDATE SUPERVISOR SET FName = ?, LName = ? WHERE Supervisor_ID = ?";
  try {
    await db.promise().query(q, [fName, lName, id]);
    return res
      .status(200)
      .json({ message: "Profile edit successful.", status: 200 });
  } catch (err) {
    console.error("Error in editSupProfile:", err);
    return res.status(500).json(err);
  }
};

export const changePassword = async (req, res) => {
  const { id, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const q = "UPDATE student SET Password = ? WHERE UCID = ?";
  try {
    await db.promise().query(q, [hashedPassword, id]);
    return res.status(200).json({ message: "Password updated!", status: 200 });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const changeSupPassword = async (req, res) => {
  const { id, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const q = "UPDATE supervisor SET Password = ? WHERE Supervisor_ID = ?";
  try {
    await db.promise().query(q, [hashedPassword, id]);
    return res.status(200).json({ message: "Password updated!", status: 200 });
  } catch (err) {
    return res.status(500).json(err);
  }
};
