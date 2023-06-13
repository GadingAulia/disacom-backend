import Join from "../models/join.js";

export const createJoin = async (req, res) => {
  const { fullName, email, phone } = req.body;

  const newJoin = new Join({
    fullName,
    email,
    phone,
  });

  try {
    const savedJoin = await newJoin.save();
    res.status(200).json({
      success: true,
      message: "Join data has been submitted",
      data: savedJoin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
