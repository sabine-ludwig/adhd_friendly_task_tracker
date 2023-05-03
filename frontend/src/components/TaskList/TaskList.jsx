import React from "react";

const TaskList = ({}) => {
    // console.log()
    return (
        <div>
            <h4>Task List</h4>
            {tbd.tasks[0] && tbd.tasks.map((item => 
            <p>
            {item.text} 
            </p>
            ))}
            
            
        </div>
    )
}

export default TaskList;