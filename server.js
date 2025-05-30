const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
//connectDB();

const app = express();
app.use(express.json());
// <!-- Prod Move -->
// app.use(
//   cors({
//     origin: "https://witty-desert-082c0e710.6.azurestaticapps.net"
//   })
// );
// <!-- Local Run -->
app.use(
  cors()
);
// Ensure uploads directory exists
if (!fs.existsSync("./uploads")) fs.mkdirSync("./uploads");

app.get("/", (req, res) => {
  res.send("Backend is running on IIS");
});

// <!-- Prod Move -->
// app.use(
//   "/uploads",
//   cors({
//     origin: "https://witty-desert-082c0e710.6.azurestaticapps.net",
//   }),
//   express.static(path.join(__dirname, "uploads"))
// );
// <!-- Local Run -->
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
  );
// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/pdfRoutes"));
app.use("/api", require("./routes/woundRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
