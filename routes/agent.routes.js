const express = require("express");
const {
  createAgent,
  getAgentTasks,
} = require("../controllers/agent.controller");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createAgent);
router.get("/:agentId/tasks", authMiddleware, getAgentTasks);

module.exports = router;
