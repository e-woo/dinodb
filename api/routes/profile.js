import express from "express";
import { showInfo, showClubs, showInfoSup } from "../controllers/profile.js";

const router = express.Router();

router.post("/show", showInfo);
router.post("/showSup", showInfoSup);
router.post("/clubs", showClubs);

export default router;
