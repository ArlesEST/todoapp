import React, { useState } from 'react';
import './App.css';
const [tasks, setTasks] = useState([]);


function App() {
  const [tasks, setTasks] = useState([]); // Initialize tasks state with an empty array
  const [inputValue, setInputValue] = useState(''); // Initialize inputValue state with an empty string

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update inputValue state with the current value of the input field
  };

  const handleCreateTask = () => {
    if (inputValue.trim() !== '') {
      setTasks([...tasks, inputValue]); // Add the inputValue to the tasks array
      setInputValue(''); // Reset inputValue to an empty string
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="TrailHub.png" className="App-logo" alt="logo" />
      </header>
      <body>
        <div className="">
          <input
            placeholder="Trail name ..."
            type="text"
            className="Name"
            name="Name"
            value={inputValue} // Bind the value of the input field to the inputValue state
            onChange={handleInputChange} // Call handleInputChange when the value of the input field changes
          />
          <button className="Trail-button" alt="Create Trail" onClick={handleCreateTrail}>
            Create Trail
          </button>
        </div>
        <div className="TaskList">
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ul>
        </div>
      </body>
    </div>
  );
}

export default App;

