const { redisClient } = require('../config/redis');
const Task = require('../models/Task');

const REDIS_KEY = 'FULLSTACK_TASK_SAJID'; 
const MAX_CACHE_ITEMS = 50;

// Add a new task
const addTask = async (taskText) => {
  try {
    // Get current tasks from Redis
    const cachedTasks = await redisClient.get(REDIS_KEY);
    let tasks = [];
    
    if (cachedTasks) {
      tasks = JSON.parse(cachedTasks);
    }
    
    // Add new task
    tasks.push({ text: taskText, createdAt: new Date() });
    
    // Check if we need to move tasks to MongoDB
    if (tasks.length > MAX_CACHE_ITEMS) {
      try {
        await moveTasksToMongoDB(tasks);
        tasks = []; // Clear the cache
      } catch (error) {
        console.error('Error moving tasks to MongoDB, keeping in cache:', error);
      }
    }
    
    // Update Redis cache
    await redisClient.set(REDIS_KEY, JSON.stringify(tasks));
    
    return { success: true };
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

// Move tasks from Redis to MongoDB
const moveTasksToMongoDB = async (tasks) => {
  try {
    // Create an array of task documents
    const taskDocs = tasks.map(task => ({
      text: task.text,
      createdAt: task.createdAt
    }));
    
    // Insert tasks into MongoDB
    await Task.insertMany(taskDocs);
    console.log(`Moved ${tasks.length} tasks to MongoDB`);
    
    return { success: true };
  } catch (error) {
    console.error('Error moving tasks to MongoDB:', error);
    throw error;
  }
};

// Fetch all tasks (from both Redis and MongoDB)
const fetchAllTasks = async () => {
  try {
    // Get tasks from Redis
    const cachedTasks = await redisClient.get(REDIS_KEY);
    let redisTasks = [];
    
    if (cachedTasks) {
      redisTasks = JSON.parse(cachedTasks);
    }
    
    let mongoTasks = [];
    
    try {
      mongoTasks = await Task.find().sort({ createdAt: -1 });
    } catch (error) {
      console.error('Error fetching MongoDB tasks, continuing with Redis tasks only:', error);
    }
    
    // Combine tasks
    const allTasks = [
      ...redisTasks,
      ...mongoTasks.map(task => ({
        text: task.text,
        createdAt: task.createdAt,
        _id: task._id
      }))
    ];
    
    return allTasks;
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    throw error;
  }
};

module.exports = {
  addTask,
  fetchAllTasks
}; 