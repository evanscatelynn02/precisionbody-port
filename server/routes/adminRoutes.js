const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const Appointment = require("../models/Appointment");
const User = require("../models/User");
const Estimate = require("../models/Estimate"); 

// GET ALL USERS (ADMIN)
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE CUSTOMER (ADMIN ONLY)
router.delete("/customers/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Prevent deleting admin accounts
    if (user.role === "admin") {
      return res.status(400).json({
        message: "Cannot delete admin account",
      });
    }

    await user.deleteOne();

    res.json({
      message: "User removed successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ESTIMATES (ADMIN)
router.get("/estimates", protect, adminOnly, async (req, res) => {
  try {
    const estimates = await Estimate.find().populate("userId");
    res.json(estimates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL APPOINTMENTS (ADMIN)
router.get("/appointments", protect, adminOnly, async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId")
      .populate("vehicleId")
      .populate("estimateId");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE APPOINTMENT STATUS (ADMIN)
router.put("/appointments/:id", protect, adminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    // Unified status update
    appointment.status = req.body.status;

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CANCEL APPOINTMENT (ADMIN)
router.put("/appointments/:id/cancel", protect, adminOnly, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    // Unified cancel
    appointment.status = "Cancelled";

    await appointment.save();

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE ESTIMATE STATUS (ADMIN)
router.put("/estimates/:id", protect, adminOnly, async (req, res) => {
  try {
    const estimate = await Estimate.findById(req.params.id);

    if (!estimate) {
      return res.status(404).json({ message: "Not found" });
    }

    estimate.status = req.body.status || estimate.status;
    await estimate.save();

    res.json(estimate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
