const express = require("express");

const router = express.Router();

const {
  createVehicle,
  getUserVehicles,
} = require("../controllers/vehicleController");

const {
  protect,
} = require("../middleware/authMiddleware");


// CREATE VEHICLE
router.post(
  "/",
  protect,
  createVehicle
);


// GET USER VEHICLES
router.get(
  "/",
  protect,
  getUserVehicles
);

module.exports = router;