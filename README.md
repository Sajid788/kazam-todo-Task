# Kazam Task Management Application

A full-stack to-do list application built with Node.js, React, Redis, MongoDB, and MQTT.

## Project Structure

The project is divided into two main parts:

- **Frontend**: React application with Tailwind CSS for styling
- **Backend**: Express.js API with MongoDB, Redis, and MQTT integration

## Quick Start

### Prerequisites

- Node.js 
- MongoDB
- Redis
- MQTT Broker (e.g., Mosquitto)

### Installation and Setup

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Kazam-Task
   ```

2. Set up the backend
   ```bash
   cd backend
   npm install
   # Configure your environment variables in .env file
   npm run dev
   ```

3. Set up the frontend
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. Access the application at `http://localhost:3000`

## Features

- Create, read, update, and delete tasks
- Real-time updates via MQTT
- Data caching with Redis
- Responsive UI built with React and Tailwind CSS

## Screenshot
![image](https://github.com/user-attachments/assets/6b314077-c5cb-46a7-b5a8-9548840983b2)


