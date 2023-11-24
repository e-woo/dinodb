import express from "express"
import { showProgram } from "../controllers/program.js"

const router = express.Router()

router.post("/show", showProgram)

export default router