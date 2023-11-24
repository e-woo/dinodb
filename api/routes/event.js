import express from "express"
import { showEvent } from "../controllers/event.js"

const router = express.Router()

router.post("/show", showEvent)

export default router