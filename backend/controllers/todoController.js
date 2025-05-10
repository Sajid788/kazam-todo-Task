const { fetchAllTasks, addTask } = require('../services/todoService');

// Get All Task
const getAllTasks = async (req, res) => {
  try {
    const tasks = await fetchAllTasks();
    res.json(tasks);
  } catch (error) {
    console.error('Error in getAllTasks controller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add Task
const createTask = async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ message: 'Please provide task text' });
    }
    
    await addTask(text);
    res.status(201).json({ message: 'Task added successfully' });
  } catch (error) {
    console.error('Error in createTask controller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTasks,
  createTask
}; 