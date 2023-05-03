import React from "react";

const RewardList = ({}) => {
    // console.log()
    return (
        <div>
            <h4>Reward List</h4>
            {tbd.rewards[0] && tbd.rewards.map((item => 
            <p>
            {item.text} 
            </p>
            ))}
            
            
        </div>
    )
}

export default RewardList;