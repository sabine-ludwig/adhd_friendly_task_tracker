import React, { useState } from "react";
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import "./RewardList.css";

const RewardList = ({ rewards, fetchRewards }) => {
  const [user, token] = useAuth(); 

  const handleUseReward = async (rewardId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/user_rewards/${rewardId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      fetchRewards();
    } catch (error) {
      console.error(error);
    }
  };

    return (
      <div>
        <h4 className="reward-list-title">Reward List</h4>
        <ul className="reward-list">
          {rewards.length > 0 ? (
            rewards.map((reward, index) => (
              <li key={reward.id}>
                {index + 1}. {reward.name}
                <button className="add-reward-button" onClick={() => handleUseReward(reward.id)}>
                Use Reward
              </button> 
              </li>
            ))
          ) : (
            <p>No rewards added</p>
          )}
        </ul>
      </div>
    );
  };

  export default RewardList;
