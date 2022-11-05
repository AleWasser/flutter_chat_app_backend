/*
  Path: api/users
*/
const { Router } = require("express");

const usersController = require("../controllers/users");
const { validateToken } = require("../middleware/validate-token");

const router = Router();

router.get("/", validateToken, usersController.getUsers);

module.exports = router;
