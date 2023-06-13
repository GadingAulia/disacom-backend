import Info from "../models/info.js";

export const createInfo = async (req, res) => {
  const newInfo = new Info(req.body);

  try {
    const savedInfo = await newInfo.save();

    res.status(200).json({
      success: true,
      message: "Succeccfully create",
      data: savedInfo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to created. Try again",
    });
  }
};

export const updateInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedInfo = await Info.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succeccfully updated",
      data: updatedInfo,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const deleteInfo = async (req, res) => {
  const id = req.params.id;

  try {
    await Info.findByIdAndDelete(id);

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

export const getSingleInfo = async (req, res) => {
  const id = req.params.id;

  try {
    const info = await Info.findById(id);

    res.status(200).json({
      success: true,
      message: "Succeccfull",
      data: info,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const getInfo = async (req, res) => {
  const page = parseInt(req.query.page);

  try {
    const info = await Info.find({})
      .skip(page * 8)
      .limit(8);

    res.status(200).json({
      success: true,
      count: info.length,
      message: "Successfully retrieved information",
      data: info,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Not found",
    });
  }
};

export const getInfoBySearch = async (req, res) => {
  const { city, title, jenis } = req.query;
  const query = {};

  if (city) {
    query.city = { $regex: city, $options: "i" };
  }

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (jenis) {
    query.jenis = { $regex: jenis, $options: "i" };
  }

  try {
    const information = await Info.find(query);

    res.status(200).json({
      success: true,
      message: "Successfully retrieved information",
      data: information,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve information",
    });
  }
};
