import React, { useState } from "react";
import axios from "axios";
import "./TaskList.css";

const TaskList = ({
  tasks,
  setTasks,
  deleteTask,
  editTask,
  token,
  fetchTasks,
}) => {
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  const handleStartTask = async (taskId) => {
    console.log("Start button clicked");

    let date = new Date();
    let mysqlFormatDate = date.toISOString().slice(0, 19).replace("T", " ");

    try {
      let response = await axios.put(
        `http://127.0.0.1:5000/api/user_tasks/${taskId}`,
        {
          status: "Started",
          start_time: mysqlFormatDate,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              status: "Started",
            };
          }
          return task;
        });
      });

      console.log(response.data);

      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinishTask = async (taskId) => {
    console.log("Finish task:", taskId);

    try {
      await axios.patch(
        `http://127.0.0.1:5000/api/user_tasks/${taskId}`,
        { action: "finish" },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      setTasks((prevTasks) => {
        return prevTasks.map((task) => {
          if (task.id === taskId) {
            return {
              ...task,
              status: "Completed", 
            };
          }
          return task;
        });
      });

      fetchTasks();
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleEdit = (taskId) => {
    editTask(taskId, updatedData);
    setEditingTaskId(null);
  };

  const handleEditClick = (task) => {
    setUpdatedData({ name: task.name, description: task.description });
    setEditingTaskId(task.id);
  };

  return (
    <div className="task-list-container">
      <div className="task-list">
        <h4 className="task-list-title">Task List</h4>
        {tasks.length > 0 ? (
          <table className="task-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, index) => (
                <tr key={task.id}>
                  <td>{task.status}</td>
                  <td>{index + 1}</td>
                  {editingTaskId === task.id ? (
                    <>
                      <td>
                        <input
                          value={updatedData.name}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          value={updatedData.description}
                          onChange={(e) =>
                            setUpdatedData({
                              ...updatedData,
                              description: e.target.value,
                            })
                          }
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{task.name}</td>
                      <td>{task.description}</td>
                    </>
                  )}
                  <td className="task-buttons">
                  {task.status === "Not Yet Started" ? (
                    <button
                      className="add-task-button"
                      onClick={() => handleStartTask(task.id)}
                    >
                      Start
                    </button>
                  ) : task.status === "Started" ? (
                    <button
                      className="add-task-button"
                      onClick={() => handleFinishTask(task.id)}
                    >
                      Finish
                    </button>
                  ) : null}
                  {editingTaskId === task.id ? (
                    <button
                      className="add-task-button"
                      onClick={() => handleEdit(task.id)}
                    >
                      Submit Changes
                    </button>
                  ) : (
                    <button
                      className="add-task-button"
                      onClick={() => handleEditClick(task)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="add-task-button"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-tasks">No tasks added</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
