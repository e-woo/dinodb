import express from "express"
import { getAnnouncements, postAnnouncement } from "../controllers/announcement.js"

const router = express.Router();

router.post("/post", postAnnouncement);
router.post("/getAnnouncements", getAnnouncements);

export default router;