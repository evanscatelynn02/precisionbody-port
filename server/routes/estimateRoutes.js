const express = require("express");

const router = express.Router();

const {
  createEstimate,
} = require("../controllers/estimateController");

const { protect } = require("../middleware/authMiddleware");


// CREATE ESTIMATE
router.post("/", protect, createEstimate);

module.exports = router;