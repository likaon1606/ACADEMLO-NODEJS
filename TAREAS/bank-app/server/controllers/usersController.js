const { User } = require("../models/usersModel");
const { Transfer } = require("../models/transfersModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); //TO STOCK

    res.status(200).json({
      //RETURN TO CLIENT
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

const userSingUp = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, password } = req.body;

    const accountNumber = Math.floor(Math.random() * 999999);

    const newUser = await User.create({
      name,
      password,
      accountNumber,
    });

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = User.findOne({ where: { accountNumber, status: "active" } });

    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "Credentials not valid",
      });
    }

    if (password === user.password) {
      return res.status(400).json({
        status: "error",
        message: "Credentials not valid",
      });
    }

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const getIdHistory = async (req, res) => {
  try {
    const { id } = req.params;
     
    const user = await User.findOne({
      where: { id },
      include: [{ model: Transfer }],
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found, pleace register",
      });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loginUser,
  userSingUp,
  getIdHistory,
  getAllUsers,
};
