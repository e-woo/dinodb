import express from "express";
import { getOrganizations } from "../controllers/organization.js";

const router = express.Router();

router.get('/getOrganizations', getOrganizations);

export default router;