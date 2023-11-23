import express from "express"
import { showInfo, showClubs } from "../controllers/profile.js"

const router = express.Router()

router.post("/show", showInfo)
router.post("/clubs", showClubs)

export default router