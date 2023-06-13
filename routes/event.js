import express from "express";
import { createEvent, updateEvent, deleteEvent, getEvent, getEventAll } from "./../controllers/eventController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createEvent);

router.put("/:id", verifyAdmin, updateEvent);

router.delete("/:id", verifyAdmin, deleteEvent);

router.get("/:id", getEvent);

router.get("/", getEventAll);

export default router;
