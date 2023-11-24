import express from "express"
import { showClub, get4Clubs } from "../controllers/club.js"

const router = express.Router()

router.post("/show", showClub)
router.get("/get4Clubs", get4Clubs)

export default router