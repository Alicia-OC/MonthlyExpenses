const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
//const authJwt = require("../middlewares/authJwt");

router.route("/signup").post(usersController.newUser);
router.route("/update").patch(usersController.updateDetails);
router.route("/addCard").patch(usersController.updateCards);
router.route("/:userId/cards").get(usersController.getAllCardsByUser);

module.exports = router;
