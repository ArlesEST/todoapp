import React from 'react';
import Weather from './Weather';

function Task({ task, handleToggleCompleted, handleDeleteTrail }) {
  return (
    <div className="task-container">
      <div className={task.completed ? 'task-name task-completed' : 'task-name'}>
        {task.name}
      </div>
      <div className={task.completed ? 'task-date task-completed' : 'task-date'}>
        {task.date}
      </div>
      <div className={task.completed ? 'task-time task-completed' : 'task-time'}>
        {task.time}
      </div>
      <div className={task.completed ? 'task-place task-completed' : 'task-place'}>
        {task.place}
      </div>
      <div className="task-checkbox">
        <p>Completed: </p>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => handleToggleCompleted(task)}
        />
      </div>
      <div className="task-delete">
        <button onClick={() => handleDeleteTrail(task)}>Delete</button>
      </div>
      <Weather place={task.place} time={task.time} />
      
    </div>
  );
}

export default Task;
