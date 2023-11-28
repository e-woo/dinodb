import express from "express";
import {
  showVolunteering,
  get4Volunteer,
  createVolunteering,
  editVolunteer,
  getExecs,
  deleteVolunteer,
  leaveVolunteer,
  joinVolunteer,
} from "../controllers/volunteer.js";

const router = express.Router();

router.post("/show", showVolunteering);
router.get("/get4Volunteer", get4Volunteer);
router.post("/create", createVolunteering);
router.post("/edit", editVolunteer);
router.post("/getExecs", getExecs);
router.delete("/delete", deleteVolunteer);
router.post("/join", joinVolunteer);
router.delete("/leave", leaveVolunteer);

export default router;
