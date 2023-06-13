import express from "express";
import { registerWithPhoto, login } from "../controllers/authController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("photo"), registerWithPhoto);
router.post("/login", login);

export default router;
