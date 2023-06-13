import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  const newEvent = new Event(req.body);

  try {
    const savedEvent = await newEvent.save();

    res.status(200).json({
      success: true,
      message: "Succeccfully create",
      data: savedEvent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to created. Try again",
    });
  }
};

export const updateEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Succeccfully updated",
      data: updatedEvent,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update",
    });
  }
};

export const deleteEvent = async (req, res) => {
  const id = req.params.id;

  try {
    await Event.findByIdAndDelete(id);

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

export const getEvent = async (req, res) => {
  const id = req.params.id;

  try {
    const event = await Event.findById(id);

    res.status(200).json({
      success: true,
      message: "Succeccfull",
      data: event,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

export const getEventAll = async (req, res) => {
  try {
    const event = await Event.find({});

    res.status(200).json({
      success: true,
      message: "Succeccful",
      data: event,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};
