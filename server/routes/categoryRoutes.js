const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/categoryControllers");
//const authJwt = require("../middlewares/authJwt");

router.route("/").get(categoryControllers.getCategory);



module.exports = router;
