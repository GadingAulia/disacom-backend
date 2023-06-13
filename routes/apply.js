import express from "express";
import { createApply } from "../controllers/applyController.js";
import multer from "multer";

const router = express.Router();

// Konfigurasi Multer untuk mengunggah file CV
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Tentukan direktori penyimpanan file CV
    cb(null, "D:/Skilvul/tour-management/backend/berkas");
  },
  filename: function (req, file, cb) {
    // Tentukan nama file CV yang disimpan (bisa diganti dengan sesuai kebutuhan)
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("cv"), createApply);

export default router;
