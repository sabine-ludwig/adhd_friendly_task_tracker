import React from "react";
import useCustomForm from "../../hooks/useCustomForm";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const RewardForm = ({}) => {
    const [user, token] = useAuth();
    const defaultValues = {
        "Reward": ""
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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Reward:{""}
                    <input
                    type="text"
                    name="Reward"
                    value={formData.text}
                    onChange={handleInputChange}
                    />
                </label>
                <button>Add Reward</button>
            </form>

        </div>
    );
}

export default RewardForm;