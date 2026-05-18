const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
    },

    estimateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Estimate",
    },

    appointmentDate: Date,

    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
    },

    repairStatus: {
      type: String,
      enum: ["Pending", "Approved", "In Progress", "Completed"],
      default: "Pending",
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);