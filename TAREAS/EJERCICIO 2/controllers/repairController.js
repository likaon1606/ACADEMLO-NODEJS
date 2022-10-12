const { Repair } = require("../models/repairsModel");
const { User } = require("../models/userModel");
const { validationResult } = require("express-validator");

const getAllRepairs = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      include: [{ model: User }],
    });

    res.status(200).json({
      repairs,
    });
  } catch (error) {
    console.log(error);
  }
};

const getRepairById = async (req, res) => {
  try {
    const { repair } = req;

    res.status(200).json({
      repair,
    });
  } catch (error) {
    console.log(error);
  }
};

const createRepair = async (req, res) => {
  const { date, computerNumber, comments, userId } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map(({ msg }) => msg);
    const errorMsg = messages.join(". ");

    return res.status(400).json({
      status: "error",
      message: errorMsg,
    });
  }

  const newRepair = await Repair.create({
    date,
    computerNumber,
    comments,
    userId,
  });

  res.status(201).json({ newRepair });
};

const updateRepair = async (req, res) => {
  try {
    const { repair } = req;
    const { computerNumber, comments } = req.body;

    await repair.update({ computerNumber, comments });

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const deleteRepair = async (req, res) => {
  try {
    const { repair } = req;

    await repair.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
};
