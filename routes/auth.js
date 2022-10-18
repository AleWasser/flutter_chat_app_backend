/*
  Path: api/login
*/
const { Router } = require("express");
const { check } = require("express-validator");

const authController = require("../controllers/auth");
const { validateFields } = require("../middleware/validate-fields");
const { validateToken } = require("../middleware/validate-token");

const router = Router();

router.post(
  "/new",
  [
    check("name", "Field name is required").notEmpty(),
    check("email", "Field email is required").isEmail().notEmpty(),
    check("password", "Field password is required").notEmpty(),
    validateFields,
  ],
  authController.createUser
);

router.post(
  "/",
  [
    check("email", "Field email is required").isEmail().notEmpty(),
    check("password", "Field password is required").notEmpty(),
    validateFields,
  ],
  authController.loginUser
);

router.get("/renew", validateToken, authController.renewToken);

module.exports = router;
