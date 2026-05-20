const express = require("express");

const router = express.Router();

const {
  createEstimate,
  getUserEstimates,
} = require("../controllers/estimateController");

const { protect } = require("../middleware/authMiddleware");

//GET USER ESTIMATES
router.get("/", protect, getUserEstimates);

// CREATE ESTIMATE
router.post("/", protect, createEstimate);


module.exports = router;