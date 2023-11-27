import express from "express"
import { changePassword, editProfile } from "../controllers/student.js";

const router = express.Router();

router.post("/edit", editProfile);
router.post("/password", changePassword);

export default router;