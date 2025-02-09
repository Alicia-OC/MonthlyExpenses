const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
//const authJwt = require("../middlewares/authJwt");

router.route("/signup").post(usersController.newUser);
router.route("/").patch(usersController.updateDetails);


module.exports = router;
