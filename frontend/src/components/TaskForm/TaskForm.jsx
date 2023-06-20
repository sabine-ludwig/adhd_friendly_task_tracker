import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import moment from 'moment';
import "./TaskForm.css";

const TaskForm = ({onTaskAdded }) => {
  const [user, token] = useAuth();
  const defaultValues = {
    name: "",
    task_type: "",
    description: "",
    deadline: ""
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    postNewTask
  );

  async function postNewTask() {
    try {
      let dataToSubmit = { 
        ...formData,
        deadline: moment(formData.deadline).format('YYYY-MM-DD HH:mm:ss')
      };

      let response = await axios.post(
        "http://127.0.0.1:5000/api/user_tasks",
        dataToSubmit,
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );
      console.log(response.data);
      onTaskAdded();
      reset();
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
          Task Type:
          <input
            className="task-form-input"
            type="text"
            name="task_type"
            value={formData.task_type}
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
        <label className="task-form-label">
          Deadline:
          <input
            className="task-form-input"
            type="datetime-local"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleInputChange}
          />
        </label>
        <div className="button-wrapper">
        <button className="task-form-submit" type="submit">
          Add Task
        </button>
        </div>
      </form>
    </div>
  );
}
export default TaskForm;
