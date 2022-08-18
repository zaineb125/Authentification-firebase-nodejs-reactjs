const express = require("express");
const authController = require("./../controller/authController");
const { check, validationResult } = require("express-validator");
const router = express.Router();

router
  .route("/signup")
  .post(
    [
      check("email", "Take the form of an email").isEmail(),
      check("firstName", "FirstName is required").notEmpty(),
      check("lastName", "LastName is required").notEmpty(),
      check("password", "Password is required").notEmpty().isLength({ min: 5 }),
      check("confirmPassword", "ConfirmPassword is required").notEmpty(),
    ],
    authController.registerUser
  );
router
  .route("/signin")
  .post(
    [
      check("email", "Take the form of an email").isEmail(),
      check("password", "Password is required").notEmpty(),
    ],
    authController.signIn
  );
router.route("/logout").get(authController.logout);
router.route("/forget-password").post(authController.forgetPassword);
router
  .route("/resetPassword/:id/:token")
  .post(
    [
      check("email", "Take the form of an email").isEmail(),
      check("password", "Password is required").notEmpty(),
    ],
    authController.resetPassword
  );
router.route("/findUserByEmail").post(authController.findUserByEmail);

module.exports = router;
