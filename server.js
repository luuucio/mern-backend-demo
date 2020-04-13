const express = require("express");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Mongoose
connectDB();

// Init middleware
app.use(express.json({ express: false }));

// Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

// A basic endpoint
app.get("/", (req, res) =>
  res.json({ message: "Welcome to the MERN backend demo" })
);

// Start the server
app.listen(PORT, () => console.log(`Start listening on port ${PORT}...`));
