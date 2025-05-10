const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const connectMQTT = require('./config/mqtt');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tasks', todoRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
connectDB();

// Connect to Redis
connectRedis();

// Connect to MQTT broker
connectMQTT();

// Start server
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
}); 