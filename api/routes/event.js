import express from "express"
import { showEvent, get4Events, createEvent, getExecs, editEvent, deleteEvent } from "../controllers/event.js"

const router = express.Router()

router.post("/show", showEvent)
router.get("/get4Events", get4Events)
router.post("/create", createEvent)
router.post("/edit", editEvent)
router.post("/getExecs", getExecs)
router.delete("/delete", deleteEvent)

export default router