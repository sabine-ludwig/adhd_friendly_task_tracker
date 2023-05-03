import { useEffect, useState } from 'react';
import React from 'react'
import TaskList from '../../components/TaskList/TaskList';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";

const TaskPage = () => {

    const [user, token] = useAuth();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
          try {
            let response = await axios.get(
            'http://127.0.0.1:5000/api/user_tasks',    
            {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              console.log(response.data)
              setTasks(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchTasks();
  }, [token]);
    return ( 
        <div>
            <TaskList 
            user={user}
            tasks={tasks}
            setTasks={setTasks}
            />
        </div>
     );
}
 
export default TaskPage;