const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/", controller.findAll);
router.post("/", controller.create);
router.delete("/:id", controller.delete);

module.exports = router;