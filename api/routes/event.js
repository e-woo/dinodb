import express from "express"
import { showEvent, get4Events, createEvent } from "../controllers/event.js"

const router = express.Router()

router.post("/show", showEvent)
router.get("/get4Events", get4Events)
router.post("/create", createEvent)

export default router