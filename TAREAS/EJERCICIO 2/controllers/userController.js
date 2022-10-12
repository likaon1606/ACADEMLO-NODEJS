const { User } = require("../models/userModel");
const { validationResult } = require("express-validator");

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

const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const messages = errors.array().map(({ msg }) => msg);
      const errorMsg = messages.join(". ");

      return res.status(400).json({
        status: "error",
        message: errorMsg,
      });
    }

    const newUser = await User.create({ name, email, password, role });

    res.status(201).json({ newUser });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;
    // search one element, recovery id  = ?, all value
    // const user = await User.findOne({ where: { id } }); // search id with id params id:id

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params; // desestructurize id
    const { name, email, password, role } = req.body; //change to camps ej: (name, email, etc.)

    // await User.update({ name }, { where: { id } }); ANOTHER METOD TO UPDATE
    // const user = await User.findOne({ where: { id } });

    await user.update({ name, email, password, role }); //to update the name or any other

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    // const { id } = req.params;

    // const user = await User.findOne({ where: { id } });

    //DELETE FROM..
    //await user.destroy(); -----------Never destroy data------------

    await user.update({ status: "deleted" });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};
