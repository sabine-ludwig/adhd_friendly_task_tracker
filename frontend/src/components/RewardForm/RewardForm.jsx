import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./RewardForm.css"; 

const RewardForm = ({}) => {
    const [user, token] = useAuth();
    const defaultValues = {
        name: ""
    }
    
    const [formData, handleInputChange, handleSubmit] = useCustomForm(defaultValues,postNewReward);

    async function postNewReward(){
        try {
            let response = await axios.post("http://127.0.0.1:5000/api/user_rewards", formData, {
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
        <div className="reward-form-card">
            <form onSubmit={handleSubmit}>
                <label className="reward-form-label">
                    Reward:
                    <input
                    className="reward-form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    />
                </label>
                <button className="reward-form-submit" type="submit">Add Reward</button>
            </form>

        </div>
    );
}

export default RewardForm;