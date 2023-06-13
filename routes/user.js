import express from "express";
import { createUser, updateUser, deleteUser, getUser, getAllUser } from "./../controllers/userController.js";

const router = express.Router();

import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

router.post("/", createUser);

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getAllUser);

export default router;
