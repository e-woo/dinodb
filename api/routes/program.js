import express from "express"
import { showProgram, get4Programs } from "../controllers/program.js"

const router = express.Router()

router.post("/show", showProgram)
router.get("/get4Programs", get4Programs)

export default router