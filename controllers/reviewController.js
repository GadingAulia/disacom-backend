import info from "../models/info.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  const infoId = req.params.infoId;
  const newReview = new Review({ ...req.body });
  try {
    const savedReview = await newReview.save();

    await info.findByIdAndUpdate(infoId, {
      $push: { reviews: savedReview._id },
    });

    res.status(200).json({ success: true, message: "Form submitted", data: savedReview });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to submit" });
  }
};
