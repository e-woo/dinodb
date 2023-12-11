import express from "express";
import { getAllTags, getTags, setTag } from "../controllers/tag.js";

const router = express.Router();

router.get('/getAllTags', getAllTags);
router.post('/setTag', setTag)
router.post('/getTags', getTags)

export default router;