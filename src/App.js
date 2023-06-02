import React, { useEffect, useState } from 'react';
import './App.css';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="TrailHub.png" className="App-logo" alt="logo" />
      </header>
      <body>
        <TaskList />
      </body>
    </div>
  );
}

export default App;
