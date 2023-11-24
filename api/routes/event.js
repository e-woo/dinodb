import express from "express"
import { showEvent, get4Events } from "../controllers/event.js"

const router = express.Router()

router.post("/show", showEvent)
router.get("/get4Events", get4Events)

export default router