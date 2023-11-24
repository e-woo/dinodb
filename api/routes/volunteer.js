import express from "express"
import { showVolunteering, get4Volunteer } from "../controllers/volunteer.js"

const router = express.Router()

router.post("/show", showVolunteering)
router.get("/get4Volunteer", get4Volunteer)

export default router