require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/authMiddleware");
const agentRoutes = require("./routes/agent.routes");
const uploadRoutes = require("./routes/upload.routes");

const app = express();
app.use(express.json());

// connect database
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api", uploadRoutes);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorized",
    adminId: req.adminId,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
