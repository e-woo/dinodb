import express from "express";
import {
  showEvent,
  get4Events,
  createEvent,
  getExecs,
  editEvent,
  deleteEvent,
  getID,
  getClubID,
  deleteEvent2,
  joinEvent,
  leaveEvent,
  createEvent2,
  joinedEvents,
  execEvents,
  getMembers,
} from "../controllers/event.js";

const router = express.Router();

router.post("/show", showEvent);
router.get("/get4Events", get4Events);
router.post("/create", createEvent);

router.post("/create2", createEvent2);
router.post("/edit", editEvent);
router.post("/getID", getID);
router.post("/getExecs", getExecs);
router.post("/getClubID", getClubID);
router.delete("/delete", deleteEvent);
router.delete("/delete2", deleteEvent2);
router.post("/join", joinEvent);
router.delete("/leave", leaveEvent);
router.post("/getMembers", getMembers);
router.post("/joinedEvents", joinedEvents);
router.post("/execEvents", execEvents);
export default router;
