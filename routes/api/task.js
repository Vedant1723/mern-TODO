const express = require("express");
const auth = require("../../middleware/auth");
const Task = require("../../models/Task");
const router = express.Router();

//@GET Route
//@DESC Get all the Task of Specific user
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    if (tasks.length == 0) {
      return res.json({ msg: "There are No Tasks Created by this User" });
    }
    res.json(tasks);
  } catch (error) {
    console.log(error.message);
  }
});

//@POST Route
//@DESC Create A Task
router.post("/", auth, async (req, res) => {
  console.log("Body:", req.body);
  const { title, description } = req.body;
  const taskFields = {};
  taskFields.user = req.user.id;
  try {
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    const task = new Task(taskFields);
    await task.save();
    res.json(task);
  } catch (error) {
    console.log(error.message);
  }
});

//@PUT Route
//@DESC Update a Task by ID
router.put("/:id", auth, async (req, res) => {
  console.log(req.body);
  const { title, description, isCompleted } = req.body;
  const taskFields = {};
  taskFields.user = req.user.id;
  try {
    if (title) taskFields.title = title;
    if (description) taskFields.description = description;
    taskFields.isCompleted = isCompleted;
    let task = await Task.findById(req.params.id);
    if (task) {
      let task = await Task.findOneAndUpdate(
        { _id: req.params.id },
        { $set: taskFields },
        { new: true }
      );
      return res.json({ msg: "Task Updated!", data: task });
    }
    res.json({ msg: "Enter a Valid ID" });
  } catch (error) {
    console.log(error.message);
  }
});

//@DELETE Route
//@DESC Delete the Specific Taskk by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Task Deleted!" });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
