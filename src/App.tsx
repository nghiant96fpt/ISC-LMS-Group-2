import React from 'react';

import './App.css';
import CalendarInput from './components/CalendarInput';

function App() {
  return (
    <div className="App">
      <div className="p-4 ">
        <h1>Chọn ngày</h1>
        <CalendarInput />
      </div>
    </div>
  );
}

export default App;
