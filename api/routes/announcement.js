import express from "express"
import { getAnnouncementExecs, getAnnouncements, postAnnouncement, updateAnnouncement } from "../controllers/announcement.js"

const router = express.Router();

router.post("/post", postAnnouncement);
router.post("/getAnnouncements", getAnnouncements);
router.post("/getAnnouncementExecs", getAnnouncementExecs);
router.post("/update", updateAnnouncement);

export default router;