import express from "express"
import { deleteAnnouncement, getAnnouncement, getAnnouncementExecs, getAnnouncements, postAnnouncement, updateAnnouncement } from "../controllers/announcement.js"

const router = express.Router();

router.post("/post", postAnnouncement);
router.post("/getAnnouncements", getAnnouncements);
router.post("/getAnnouncementExecs", getAnnouncementExecs);
router.post("/update", updateAnnouncement);
router.post("/getAnnouncement", getAnnouncement);
router.post("/deleteAnnouncement", deleteAnnouncement);

export default router;