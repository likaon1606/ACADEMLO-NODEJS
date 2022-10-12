const express = require("express");

//controller
const { transfer } = require("../controllers/transfersController");

const router = express.Router();

router.post("/", transfer);

module.exports = { transferRouter: router };
