import express from "express"
import { register, login, logout, registerSupervisor } from "../controllers/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/registerSupervisor", registerSupervisor)
router.post("/login", login)
router.post("/logout", logout)

export default router