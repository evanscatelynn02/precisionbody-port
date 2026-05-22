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

    // ⭐ Unified status field
    status: {
      type: String,
      enum: ["Pending", "Approved", "In Progress", "Completed", "Cancelled"],
      default: "Pending",
    },

    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
