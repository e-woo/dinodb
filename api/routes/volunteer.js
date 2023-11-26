import express from "express"
import { showVolunteering, get4Volunteer, createVolunteering } from "../controllers/volunteer.js"

const router = express.Router()

router.post("/show", showVolunteering)
router.get("/get4Volunteer", get4Volunteer)
router.post("/create", createVolunteering)

export default router