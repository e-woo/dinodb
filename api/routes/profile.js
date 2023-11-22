import express from "express"
import { show } from "../controllers/profile.js"

const router = express.Router()

router.post("/show", show)

export default router