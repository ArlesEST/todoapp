import React, { useEffect, useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import Task from './Task';

function TaskList() {
  const [tasks, setTasks] = useState(() => {
    const localValue = localStorage.getItem('tasks');
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

    // Check if any input field is empty
    if (!name || !date || !time || !place) {
      alert('Please fill in all the input fields.');
      return;
    }

    const selectedDateTime = new Date(`${date}T${time}`);

    const currentDateTime = new Date();

 

    if (selectedDateTime < currentDateTime) {

      alert('Please choose a date and time in the future.');

      return;

    }

    // Generate timestamp
    const dateTimeString = `${date} ${time}`;
    const dateTime = new Date(dateTimeString);
    const timestamp = Math.floor(dateTime.getTime() / 1000);
    const timestampParam = `dt=${timestamp}`;

    const newTask = {
      name,
      date,
      time,
      place,
      completed: false,
      timestamp: timestampParam,
    };
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
          required
        />
        <input type="date" className="date" name="date" required />
        <input type="time" className="time" name="time" required />
        <input
          placeholder="Trail place ..."
          type="text"
          className="place"
          name="place"
          required
        />
        <button className="Trail-button" onClick={handleCreateTrail}>
          Create Trail
        </button>
      </div>
      <div className="tasks">
         <LoadScript
              googleMapsApiKey="AIzaSyD2vVtMVL3jAyaNQYOQ_qAcUsmOcn2SkzM"
              libraries={['places']}
            >
        </LoadScript>
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
