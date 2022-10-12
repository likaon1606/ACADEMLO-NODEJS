const express = require("express");
const { body } = require("express-validator");

const { repairExists } = require("../middlewares/repairsMiddlewares");

//Controller
const {
  getAllRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require("../controllers/repairController");

const router = express.Router();

router.get("/", getAllRepairs);
router.post(
  "/",
  body("date")
    .notEmpty()
    .withMessage('Date must not be empty, width format: "yyyy/mm/dd"'),
  body("computerNumber")
    .notEmpty()
    .withMessage("computerNumber must not be empty"),
  body("comments")
    .notEmpty()
    .withMessage("comments must not be empty")
    .isLength({ min: 10, max: 30 })
    .withMessage("min 10 characters, max 30 characters"),
  createRepair
);

router
  .route("/:id")
  .get(repairExists, getRepairById)
  .patch(repairExists, updateRepair)
  .delete(repairExists, deleteRepair);

module.exports = { repairsRouter: router };
