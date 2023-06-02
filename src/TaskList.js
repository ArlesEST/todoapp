import React, { useEffect, useState } from 'react';
import Task from './Task';

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem("tasks");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTrail = () => {
    const name = document.querySelector('.Name').value;
    const date = document.querySelector('.date').value;
    const time = document.querySelector('.time').value;
    const place = document.querySelector('.place').value;

    const currentDate = new Date().toISOString().split('T')[0];

    if (date < currentDate) {
      alert('Please choose a date in the future.');
      return;
    }

    const newTask = { name, date, time, place, completed: false };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTrail = (task) => {
    const newTasks = tasks.filter((t) => t !== task);
    setTasks(newTasks);
  };

  const handleToggleCompleted = (task) => {
    const newTasks = tasks.map((t) => {
      if (t === task) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTasks(newTasks);
  };

  const handleRemoveCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completed);
    setTasks(newTasks);
  };

  const renderTasks = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const dateComparison = new Date(a.date) - new Date(b.date);
      if (dateComparison === 0) {
        return a.name.localeCompare(b.name);
      }
      return dateComparison;
    });

    return sortedTasks.map((task, index) => (
      <Task
        key={index}
        task={task}
        handleToggleCompleted={handleToggleCompleted}
        handleDeleteTrail={handleDeleteTrail}
      />
    ));
  };

  return (
    <div>
      <div className="Div-Creater">
        <input
          placeholder="Trail name ..."
          type="text"
          className="Name"
          name="Name"
        />
        <input type="date" className="date" name="date" />
        <input type="time" className="time" name="time" />
        <input
          placeholder="Trail place ..."
          type="text"
          className="place"
          name="place"
        />
        <button className="Trail-button" onClick={handleCreateTrail}>
          Create Trail
        </button>
      </div>
      <div className="tasks">
        {renderTasks()}
        {tasks.some((task) => task.completed) && (
          <div>
            <button
              className="task-delete-completed"
              onClick={handleRemoveCompleted}
            >
              Remove completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
