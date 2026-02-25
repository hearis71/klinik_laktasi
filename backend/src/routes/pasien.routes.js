const express = require("express");
const router = express.Router();
const pasienController = require("../controllers/pasien.controller");

router.post("/", pasienController.create);
router.get("/", pasienController.findAll);
router.get("/:id", pasienController.findOne);
router.put("/:id", pasienController.update);
router.delete("/:id", pasienController.remove);

module.exports = router;