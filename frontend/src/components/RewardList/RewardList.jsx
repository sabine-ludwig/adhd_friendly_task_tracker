import React from "react";
import "./RewardList.css";

const RewardList = ({ rewards }) => {
    return (
      <div className="reward-list">
        <h4 className="reward-list-title">Reward List</h4>
        <ul>
          {rewards.length > 0 ? (
            rewards.map((reward, index) => (
              <li key={reward.id}>
                {index + 1}. {reward.name} 
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