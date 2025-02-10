const express = require("express");
const router = express.Router();
const monthCardControllers = require("../controllers/monthCardControllers");

router.route("/new").post(monthCardControllers.newCard);
router.route("/update").patch(monthCardControllers.updateCard);

module.exports = router;
