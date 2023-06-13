import express from "express";
import { createJoin } from "../controllers/joinController.js";

const router = express.Router();

router.post("/", createJoin);

export default router;
