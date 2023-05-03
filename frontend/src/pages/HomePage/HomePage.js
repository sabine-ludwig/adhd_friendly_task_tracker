import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  const [user, token] = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:5000/api/user_tasks", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchTasks();
  }, [token]);
  return (
    <div className="container">
      {console.log(user)}
      <h1>Home Page for {user.username}!</h1>
      {tasks &&
        tasks.map((task) => (
          <p key={task.id}>
            {task.name} {task.description} {task.status}
          </p>
        ))}
    </div>
  );
};

export default HomePage;
