const express = require("express");
const { body } = require("express-validator");

//MIDDLEWARES
const { userExists } = require("../middlewares/usersMiddlewares");

//Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);

router.post(
  "/",
  body("name").notEmpty().withMessage("Name must not be empty"),
  body("email")
    .notEmpty()
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Email invalid, make sure it is an email"),
  body("password")
    .notEmpty()
    .withMessage("Password must not be empty")
    .isLength({ min: 8 })
    .withMessage("must contain at least 8 characters long"),
  createUser
);

// router.get('/:id', getUserById); //request id dinamic

// router.patch('/:id', updateUser);

// router.delete('/:id', deleteUser);

router //optimize routes
  .route("/:id")
  .get(userExists, getUserById)
  .patch(userExists, updateUser)
  .delete(userExists, deleteUser);

module.exports = { usersRouter: router };
