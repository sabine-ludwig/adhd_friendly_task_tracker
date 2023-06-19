import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./TaskForm.css";

const TaskForm = ({onTaskAdded }) => {
  const [user, token] = useAuth();
  const defaultValues = {
    name: "",
    description: "",
    deadline: ""
  };

  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    postNewTask
  );

  async function postNewTask() {
    try {
      let response = await axios.post(
        "http://127.0.0.1:5000/api/user_tasks",
        formData,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      console.log(response.data);
      onTaskAdded();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="task-form-card">
      <form onSubmit={handleSubmit}>
        <label className="task-form-label">
          Task:
          <input
            className="task-form-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label className="task-form-label">
          Description:
          <input
            className="task-form-input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <button className="task-form-submit" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
