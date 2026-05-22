const Vehicle = require("../models/Vehicle");


// CREATE VEHICLE
const createVehicle = async (req, res) => {

  try {

    const vehicle = await Vehicle.create({

      userId: req.user._id,

      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      color: req.body.color,
      vin: req.body.vin,
    });

    res.status(201).json(vehicle);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};


// GET USER VEHICLES
const getUserVehicles = async (req, res) => {

  try {

    const vehicles = await Vehicle.find({
      userId: req.user._id,
    });

    res.json(vehicles);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createVehicle,
  getUserVehicles,
};