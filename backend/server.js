const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Import routes for item and user (make sure these are correct)
const itemRoutes = require("./routes/itemRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse incoming JSON data
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// Mongoose connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/items", itemRoutes); // Item-related routes
app.use("/api/users", userRoutes); // User-related routes

// Define the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
