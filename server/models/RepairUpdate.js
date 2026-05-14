const mongoose = require("mongoose");

const repairUpdateSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },

    updateMessage: String,

    progressPercent: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RepairUpdate", repairUpdateSchema);