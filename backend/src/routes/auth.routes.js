const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");

// Public routes
router.get("/health", controller.healthCheck);
router.post("/login", controller.login);

// Protected routes
router.get("/me", authenticate, controller.me);

module.exports = router;