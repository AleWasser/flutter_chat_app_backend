/*
  Path: api/messages
*/
const { Router } = require("express");

const messagesController = require("../controllers/messages");
const { validateToken } = require("../middleware/validate-token");

const router = Router();

router.get("/:from", validateToken, messagesController.getMessages);

module.exports = router;
