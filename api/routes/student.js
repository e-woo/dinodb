import express from "express";
import {
  changePassword,
  editProfile,
  editSupProfile,
  changeSupPassword,
} from "../controllers/student.js";

const router = express.Router();

router.post("/edit", editProfile);
router.post("/editSup", editSupProfile);
router.post("/password", changePassword);
router.post("/passwordSup", changeSupPassword);

export default router;
