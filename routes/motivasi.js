import express from "express";
import { createMotivasi, updateMotivasi, deleteMotivasi, getMotivasi, getMotivasiAll } from "./../controllers/motivasiController.js";

const router = express.Router();

router.post("/", createMotivasi);

router.put("/:id", updateMotivasi);

router.delete("/:id", deleteMotivasi);

router.get("/:id", getMotivasi);

router.get("/", getMotivasiAll);

export default router;
