const express = require("express");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/createUser").post(userController.createUser);

module.exports = router;
