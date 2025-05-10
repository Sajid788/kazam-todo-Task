# To-Do List Application

A full-stack to-do list application built with Node.js, React, Redis, MongoDB, and MQTT.

## Features

- Add tasks via MQTT topic `/add`
- Add tasks via HTTP API
- Store tasks in Redis cache (up to 50 items)
- Automatically move tasks to MongoDB when Redis cache exceeds 50 items
- Fetch all tasks through REST API
- Responsive UI built with React and Tailwind CSS

## Tech Stack

### Backend
- Node.js
- Express.js
- Redis
- MongoDB
- MQTT

### Frontend
- React.js
- Tailwind CSS
- Axios

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Usage

### Adding Tasks

- **Via UI**: Use the form in the frontend app to add tasks
- **Via MQTT**: Publish a message to the `/add` topic on the MQTT broker (broker.emqx.io:1883)
- **Via API**: Send a POST request to `http://localhost:5000/api/tasks` with JSON body: `{ "text": "Task content" }`

### Fetching Tasks

- **Via UI**: Tasks are automatically fetched and displayed in the frontend app
- **Via API**: Send a GET request to `http://localhost:5000/api/tasks/fetchAllTasks`

## Configuration

- Redis connection is configured in `backend/config/redis.js`
- MongoDB connection is configured in `backend/config/db.js`
- MQTT connection is configured in `backend/config/mqtt.js` 

## Screenshot
![image](https://github.com/user-attachments/assets/75071c43-8669-4969-b3dd-b7badbf4b0f7)

