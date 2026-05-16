const express = require("express");

const router = express.Router();

const {
  createAppointment,
  getUserAppointments,
  cancelAppointment,
} = require("../controllers/appointmentController");

const { protect } = require("../middleware/authMiddleware");


// CREATE APPOINTMENT
router.post("/", protect, createAppointment);

//GET USER APPOINTMENTS
router.get("/", protect, getUserAppointments);

//CANCEL APPOINTMENT
router.put("/:id/cancel", protect, cancelAppointment);

module.exports = router;