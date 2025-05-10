const express = require('express');
const router = express.Router();
const { getAllTasks, createTask } = require('../controllers/todoController');

// Get Task
router.get('/', getAllTasks);

router.get('/fetchAllTasks', getAllTasks);

// Add Task
router.post('/', createTask);

module.exports = router; 