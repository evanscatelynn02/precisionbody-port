const Appointment = require("../models/Appointment");


// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const {
      vehicleId,
      estimateId,
      appointmentDate,
      notes,
    } = req.body;

    if (!appointmentDate) {
  return res.status(400).json({
    message: "Appointment date required",
  });
}

    const appointment = await Appointment.create({
      userId: req.user._id,
      vehicleId,
      estimateId,
      appointmentDate,
      notes,
      repairStatus: "Pending",
    });

    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER APPOINTMENTS
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
  userId: req.user._id,
})
.populate("vehicleId")
.populate("estimateId")
.sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// CANCEL APPOINTMENT
const cancelAppointment = async (req, res) => {
  try {
    const appointment =
      await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    // Verify ownership
    if (
      appointment.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    appointment.status = "cancelled";

    await appointment.save();

    res.json({
      message: "Appointment cancelled",
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getUserAppointments,
  cancelAppointment,
};
