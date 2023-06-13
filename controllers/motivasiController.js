import Motivasi from "../models/Motivasi.js";

export const createMotivasi = async (req, res) => {
  const newMotivasi = new Motivasi(req.body);

  try {
    const savedMotivasi = await newMotivasi.save();

    res.status(200).json({
      success: true,
      message: "Succeccfully create",
      data: savedMotivasi,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to created. Try again",
    });
  }
};

export const updateMotivasi = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedMotivasi = await Motivasi.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succeccfully updated",
      data: updatedMotivasi,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const deleteMotivasi = async (req, res) => {
  const id = req.params.id;

  try {
    await Motivasi.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Succeccfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to deleted",
    });
  }
};

export const getMotivasi = async (req, res) => {
  const id = req.params.id;

  try {
    const motivasi = await Motivasi.findById(id);

    res.status(200).json({
      success: true,
      message: "Succeccfull",
      data: motivasi,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const getMotivasiAll = async (req, res) => {
  try {
    const motivasi = await Motivasi.find({});

    res.status(200).json({
      success: true,
      message: "Succeccful",
      data: motivasi,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
