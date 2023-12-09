import express from "express";
import { getFaculties } from "../controllers/faculty.js";

const router = express.Router();

router.get('/getFaculties', getFaculties);

export default router;