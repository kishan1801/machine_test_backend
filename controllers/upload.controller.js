const csv = require("csv-parser");
const { Readable } = require("stream");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const agents = await Agent.find();
    if (agents.length === 0) {
      return res.status(400).json({ message: "No agents found" });
    }

    const results = [];

    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {
        const tasks = [];

        results.forEach((item, index) => {
          const agentIndex = index % agents.length;

          tasks.push({
            firstName: item.FirstName,
            phone: item.Phone,
            notes: item.Notes,
            agent: agents[agentIndex]._id,
          });
        });

        await Task.insertMany(tasks);

        res.status(200).json({
          success: true,
          message: "CSV uploaded and tasks distributed successfully",
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { uploadAndDistribute };
