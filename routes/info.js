import express from "express";
import { createInfo, updateInfo, deleteInfo, getInfo, getSingleInfo, getInfoBySearch } from "./../controllers/infoController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/", verifyAdmin, createInfo);

router.put("/:id", verifyAdmin, updateInfo);

router.delete("/:id", verifyAdmin, deleteInfo);

router.get("/:id", getInfo);

router.get("/:id", getSingleInfo);

router.get("/", getInfoBySearch); // Endpoint untuk pencarian berdasarkan kota

export default router;
