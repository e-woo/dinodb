import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check if user already exists
  const q = "SELECT * FROM student WHERE UCID = ? OR Email = ?";

  db.query(q, [req.body.UCID, req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Student already exists!");

    const q =
      "INSERT INTO student(`UCID`, `Date_of_Birth`, `Bio`, `FName`, `LName`, `Email`, `Password`, `AccountType`) VALUES (?)";
    const values = [
      req.body.UCID,
      req.body.DOB,
      req.body.Bio,
      req.body.FName,
      req.body.LName,
      req.body.Email,
      req.body.Password,
      req.body.AccountType,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      else return res.status(200).json("Student user has been created.");
    });
  });
};

export const login = (req, res) => {
  // Check if user already exists
  const q = "SELECT * FROM student WHERE Email = ?";

  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check password
    if (req.body.Password !== data[0].Password)
      return res.status(400).json("Incorrect email or password.");

    const token = jwt.sign({ UCID: data[0].UCID }, "jwtkey");
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: "true",
    })
    .status(200)
    .json("User has been logged out.");
};
