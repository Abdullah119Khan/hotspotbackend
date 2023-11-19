const express = require('express');
const { createTask, getAllTask } = require('../controller/task.controller');
const router = express.Router();

router.post("/task/create", createTask);
router.get("/task/all", getAllTask);

module.exports = router;