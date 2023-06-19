import { useEffect, useState } from 'react';
import React from 'react';
import TaskList from '../../components/TaskList/TaskList';
import TaskForm from '../../components/TaskForm/TaskForm';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const TaskPage = () => {
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      let response = await axios.get('http://127.0.0.1:5000/api/user_tasks', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [token]);

  const handleTaskAdded = () => {
    fetchTasks(); 
  };

  const startTask = async (taskId) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/user_tasks/${taskId}`, { action: 'start' }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchTasks(); 
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  const finishTask = async (taskId) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/api/user_tasks/${taskId}`, { action: 'finish' }, {
        headers: { Authorization: 'Bearer ' + token },
      });
      fetchTasks(); 
    } catch (error) {
      console.log(error.response.data);
    }
  };
  
  
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/user_tasks/${taskId}`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      fetchTasks(); 
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const editTask = async (taskId, updatedData) => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/user_tasks/${taskId}`, updatedData, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      fetchTasks(); 
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div>
      <TaskList user={user} tasks={tasks} setTasks={setTasks} token={token} fetchTasks={fetchTasks} startTask={startTask} finishTask={finishTask} deleteTask={deleteTask} editTask={editTask} />
      <TaskForm onTaskAdded={handleTaskAdded} />
    </div>
  );
};

export default TaskPage;
