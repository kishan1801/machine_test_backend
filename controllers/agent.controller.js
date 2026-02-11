const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const Task = require("../models/Task");

const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await agent.save();

    res.status(201).json({
      success: true,
      message: "Agent created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAgentTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ agent: req.params.agentId }).populate(
      "agent",
      "name email",
    );

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createAgent, getAgentTasks, getAgents };
