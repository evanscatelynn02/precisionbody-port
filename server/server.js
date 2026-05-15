const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

//Load env vars
dotenv.config();

//DB Connection
const connectDB = require("./config/db");

//Routes
const authRoutes = require("./routes/authRoutes");
const estimateRoutes = require("./routes/estimateRoutes");

//Connect to MongoDB
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Route mounting
app.use("/api/auth", authRoutes);
app.use("/api/estimates", estimateRoutes);

//Root route
app.get("/", (req, res) => {
  res.send("PrecisionBody Port API Running");
});

//Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

