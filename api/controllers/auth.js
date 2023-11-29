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

export const registerSupervisor = (req, res) => {
  // Check if user already exists
  const q = "SELECT * FROM SUPERVISOR WHERE Email = ?";

  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("Supervisor already exists!");

    const q = `INSERT INTO SUPERVISOR(FName, LName, Email, Password) 
                VALUES (?)`;
    const values = [
      req.body.FName,
      req.body.LName,
      req.body.Email,
      req.body.Password,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      else return res.status(200).json("Supervisor user has been created.");
    });
  });
};

export const login = (req, res) => {
  // Check in both student and supervisor tables
  const studentQuery = "SELECT * FROM student WHERE Email = ?";
  const supervisorQuery = "SELECT * FROM supervisor WHERE Email = ?";

  // First check in student table
  db.query(studentQuery, [req.body.Email], (err, studentData) => {
    if (err) return res.json(err);

    if (studentData.length) {
      // Student user exists, check password
      if (req.body.Password !== studentData[0].Password) {
        return res.status(400).json("Incorrect email or password.");
      }

      // Generate token and respond
      const token = jwt.sign({ UCID: studentData[0].UCID, type: "student" }, "jwtkey");
      const { Password, ...studentOther } = studentData[0];

      return res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(studentOther);
    } else {
      // If not a student, check in supervisor table
      db.query(supervisorQuery, [req.body.Email], (err, supervisorData) => {
        if (err) return res.json(err);

        if (supervisorData.length) {
          // Supervisor user exists, check password
          if (req.body.Password !== supervisorData[0].Password) {
            return res.status(400).json("Incorrect email or password.");
          }

          // Generate token and respond
          const token = jwt.sign({ UCID: supervisorData[0].Supervisor_ID, Email: supervisorData[0].Email, type: "supervisor" }, "jwtkey");
          const { Password, ...supervisorOther } = supervisorData[0];

          return res
            .cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(supervisorOther);
        } else {
          // User not found in both tables
          return res.status(404).json("User not found!");
        }
      });
    }
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
