import React from 'react';

import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/tailwind.scss';
import CalendarInput from './components/CalendarInput';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* Gr01 - Hoài Thọ: <AppRoutes/> hoặc các component nếu muốn sử dụng redux phải nằm trong này ! */}
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </Provider>
    </div>
  );
}

export default App;
