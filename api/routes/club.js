import express from "express"
import { showClub, get4Clubs, createClub, editClub, getExecs } from "../controllers/club.js"

const router = express.Router()

router.post("/show", showClub)
router.get("/get4Clubs", get4Clubs)
router.post("/create", createClub)
router.post("/edit", editClub)
router.post("/getExecs", getExecs)

export default router