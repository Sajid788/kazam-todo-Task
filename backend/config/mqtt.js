const mqtt = require('mqtt');
const { addTask } = require('../services/todoService');

const connectMQTT = () => {
  const client = mqtt.connect('mqtt://broker.emqx.io:1883'); 

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('/add', (err) => {
      if (!err) {
        console.log('Subscribed to /add topic');
      }
    });
  });

  client.on('message', async (topic, message) => {
    console.log(`Received message on ${topic}: ${message.toString()}`);
    
    if (topic === '/add') {
      try {
        const taskText = message.toString();
        await addTask(taskText);
        console.log(`Task added: ${taskText}`);
      } catch (error) {
        console.error('Error adding task via MQTT:', error);
      }
    }
  });

  client.on('error', (err) => {
    console.error('MQTT connection error:', err);
  });

  return client;
};

module.exports = connectMQTT; 