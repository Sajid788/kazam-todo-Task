const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Create a simple mock function
    const mockConnect = () => {
      return Promise.resolve({ connection: { host: 'localhost' } });
    };
    
    // Use the mock instead of the real connection
    mongoose.connect = mockConnect;
    console.log('Mock MongoDB Connected');
    
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Don't exit the process, just log the error
    console.log('Continuing without MongoDB connection');
  }
};

module.exports = connectDB; 