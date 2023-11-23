import express from "express"
import { showClub } from "../controllers/club.js"

const router = express.Router()

router.post("/show", showClub)

export default router