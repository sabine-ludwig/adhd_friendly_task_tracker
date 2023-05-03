import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const TaskForm = ({}) => {
    const [user, token] = useAuth();
    const defaultValues = {
        "Task": "",
        "Description": "",
        // "Category": dropdown,
        "Deadline": ""
    }
    
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues,postNewTask);

    async function postNewTask(){
        try {
            let response = await axios.post("http://127.0.0.1:5000/api/user_tasks", formData, {
                headers: {
                    Authorization: "Bearer " + token,
                },
            })
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Task:{""}
                    <input
                    type="text"
                    name="Task"
                    value={formData.text}
                    onChange={handleInputChange}
                    />
                </label>
                <label>
                    Description:{""}
                    <input
                    type="text"
                    name="Description"
                    value={formData.rating}
                    onChange={handleInputChange}
                    />
                </label>
                <button>Add Task</button>
            </form>

        </div>
    );
}

export default TaskForm;