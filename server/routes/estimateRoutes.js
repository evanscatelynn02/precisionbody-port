const express = require("express");

const router = express.Router();

const {
  createEstimate,
  getUserEstimates,
} = require("../controllers/estimateController");

const { protect } = require("../middleware/authMiddleware");

const Estimate = require("../models/Estimate");

//GET USER ESTIMATES
router.get("/", protect, getUserEstimates);

// CREATE ESTIMATE
router.post("/", protect, createEstimate);

// GET SINGLE ESTIMATE
router.get("/:id", protect, async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid estimate ID" });
    }

    const estimateDoc = await Estimate.findById(req.params.id);

    if (!estimateDoc) {
      return res.status(404).json({ message: "Estimate not found" });
    }

    let query = Estimate.findById(req.params.id).populate("userId");

    if (estimateDoc.vehicleId) {
      query = query.populate("vehicleId");
    }

    const estimate = await query;

    res.json(estimate);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;