import express from "express"
import { showVolunteering } from "../controllers/volunteer.js"

const router = express.Router()

router.post("/show", showVolunteering)

export default router