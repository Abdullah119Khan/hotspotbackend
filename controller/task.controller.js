const TaskModel = require("../models/task.model");

exports.createTask = async (req, res) => {

  try {
    const newTask = new TaskModel({
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      createdBy: req.user.id
    })

    const savedTask = await newTask.save();

    return res.status(201).json({ message: "Task created successfully", task: savedTask})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getAllTask = async (req, res) => {
  try {
    const getAllTask = await TaskModel.find();

    return res.status(200).json({ success: true, task: getAllTask})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const getTaskById = await TaskModel.findById(id)

    if(!getTaskById) return res.status(404).json({ message: "Task with that ID are not found"})

    return res.status(200).json({ success: true, task: getTaskById})
  } catch(err) {
    return res.status(500).json(err.message)
  }
}