const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  getUserProfile,
} = require("../controllers/authController");


// Register route
router.post("/register", registerUser);

//LOGIN
router.post("/login", loginUser);

//GET PROFILE
router.get("/profile", protect, getUserProfile);


module.exports = router;