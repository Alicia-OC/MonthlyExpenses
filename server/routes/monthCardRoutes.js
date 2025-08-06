const express = require("express");
const router = express.Router();
const monthCardControllers = require("../controllers/monthCardControllers");
const authJwt = require("../middlewares/authJwt");

router.route("/new").post(authJwt.verifyToken, monthCardControllers.newCard);
router.route("/cards/recent").get(authJwt.verifyToken, monthCardControllers.getLastFourCards);
router.route("/:userid/:cardid").get(authJwt.verifyToken, monthCardControllers.getCard);

router.route("/update/:cardId").patch(authJwt.verifyToken, monthCardControllers.updateCard);


module.exports = router;
