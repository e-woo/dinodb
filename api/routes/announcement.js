import express from "express"
import { postAnnouncement } from "../controllers/announcement.js"

const router = express.Router();

router.post("/post", postAnnouncement);

export default router;