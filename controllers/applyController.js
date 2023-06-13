import Apply from "../models/apply.js";

export const createApply = async (req, res) => {
  const { fullName, email, phone, education } = req.body;
  const cv = req.file; // Mengakses file CV yang diunggah

  const newApply = new Apply({
    fullName,
    email,
    phone,
    education,
    cv: {
      data: cv.data,
      contentType: cv.mimetype,
    },
  });

  try {
    const savedApply = await newApply.save();
    res.status(200).json({
      success: true,
      message: "Application data has been submitted",
      data: savedApply,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
