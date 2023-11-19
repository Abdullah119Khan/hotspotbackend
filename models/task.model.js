const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  title: { 
    type: String 
  },
  description: { 
    type: String 
  },
  assignedTo: { 
    type: String 
  },
  createdBy: { 
    type: String 
  },
}, { timestamps: true })

const TaskModel = mongoose.model('Task', taskSchema)

module.exports = TaskModel;