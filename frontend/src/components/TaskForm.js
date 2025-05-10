import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskAdded }) => {
  const [taskText, setTaskText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskText.trim()) return;
    
    setIsLoading(true);
    
    try {
      await axios.post('https://kazam-todo-task.vercel.app/api/tasks', { text: taskText });
      setTaskText('');
      if (onTaskAdded) onTaskAdded();
    } catch (error) {
      console.error('Error adding task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !taskText.trim()}
          className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300 ${
            isLoading || !taskText.trim() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 