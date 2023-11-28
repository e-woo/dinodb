import express from "express"
import { showClub, get4Clubs, createClub, editClub, getExecs, deleteClub, joinClub, leaveClub, getMembers } from "../controllers/club.js"

const router = express.Router()

router.post("/show", showClub)
router.get("/get4Clubs", get4Clubs)
router.post("/create", createClub)
router.post("/edit", editClub)
router.post("/getExecs", getExecs)
router.delete("/delete", deleteClub)
router.post("/join", joinClub)
router.delete("/leave", leaveClub)
router.post("/getMembers", getMembers)

export default router