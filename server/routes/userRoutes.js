const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const authJwt = require("../middlewares/authJwt");


//router.patch("/update", authJwt.verifyToken, usersController.updateDetails);
router.patch("/addCard", authJwt.verifyToken, usersController.updateCards);
router.patch("/update/:userid", authJwt.verifyToken, usersController.updateDetails);

router.get("/:userid/cards", authJwt.verifyToken, usersController.getAllCardsByUser);
router.get("/:userid/defaultitems", authJwt.verifyToken, usersController.getUserDefaultItems);

router.patch("/update/:userid", authJwt.verifyToken, usersController.updateDetails);





module.exports = router;
