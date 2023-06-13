import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import uploadMiddleware from "../middleware/upload.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Direktori penyimpanan berkas
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname); // Nama berkas disimpan dengan prefix fieldname dan uniqueSuffix
  },
});

// Membuat middleware multer untuk menangani berkas yang dikirim
const upload = multer({ storage: storage });

export const registerWithPhoto = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt); // Mengubah password menjadi hash

    const newUser = new User({
      username,
      email,
      password: hash, // Menggunakan hash sebagai nilai password
      photo: req.file ? req.file.path : "",
    });

    await newUser.save();
    res.status(200).json({ success: true, message: "Successfully created" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to create. Try again" });
  }
};

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const checkCorrectPassword = await bcrypt.compare(req.body.password, user.password);

    if (!checkCorrectPassword) {
      return res.status(401).json({ success: false, message: "Incorrect email or password" });
    }

    const { password, role, ...rest } = user._doc;

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({ token, data: { ...rest }, role });
  } catch (err) {
    res.status(401).json({ success: false, message: "Failed to login" });
  }
};

export default upload;
