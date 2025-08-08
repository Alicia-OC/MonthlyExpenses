const express = require("express");
const router = express.Router();
const monthCardControllers = require("../controllers/monthCardControllers");
const authJwt = require("../middlewares/authJwt");

router.route("/new").post(authJwt.verifyToken, monthCardControllers.newCard);

router.route("/cards/recent").get(authJwt.verifyToken, monthCardControllers.getLastFourCards);

router.route("/:userid/cards").get(authJwt.verifyToken, monthCardControllers.getAllCards);

router.route("/:userid/cards/last-card").get(authJwt.verifyToken, monthCardControllers.getLastCard);

router.route("/:userid/:cardid").get(authJwt.verifyToken, monthCardControllers.getCard);

router.route("/update/:userid/:cardid").patch(authJwt.verifyToken, monthCardControllers.updateCard);


module.exports = router;
