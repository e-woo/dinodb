import express from "express"
import { editProfile } from "../controllers/student.js";

const router = express.Router();

router.post("/edit", editProfile);

export default router;