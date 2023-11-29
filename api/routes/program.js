import express from "express";
import {
  showProgram,
  get4Programs,
  createProgram,
  editProgram,
  getExecs,
  deleteProgram,
  joinProgram,
  leaveProgram,
  joinedPrograms,
  execPrograms,
  getMembers,
} from "../controllers/program.js";

const router = express.Router();

router.post("/show", showProgram);
router.get("/get4Programs", get4Programs);
router.post("/create", createProgram);
router.post("/edit", editProgram);
router.post("/getExecs", getExecs);
router.delete("/delete", deleteProgram);
router.post("/getMembers", getMembers);
router.post("/join", joinProgram);
router.delete("/leave", leaveProgram);

router.post("/joinedPrograms", joinedPrograms);
router.post("/execPrograms", execPrograms);
export default router;
