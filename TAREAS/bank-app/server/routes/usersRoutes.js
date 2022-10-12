const express = require("express");

//controller
const {
  userSingUp,
  loginUser,
  getIdHistory,
  getAllUsers,
} = require("../controllers/usersController");

const router = express.Router();

router.post("/signup", userSingUp);

router.post("/login", loginUser); //post login
router.get("/:id/history", getIdHistory);
router.get("/", getAllUsers);

module.exports = { usersRouter: router };
