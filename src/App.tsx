
import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import store from './redux/store';
import './styles/tailwind.scss';
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import LedershipRoutes from "./routes/LeadershipRoutes";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        {/* Gr01 - Hoài Thọ: <AppRoutes/> hoặc các component nếu muốn sử dụng redux phải nằm trong này ! */}
        <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/student" replace />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/teacher/*" element={<TeacherRoutes />} />
        <Route path="/leadership/*" element={<LedershipRoutes />} />
      </Routes>
    </Router>
      </Provider>
    </div>

  );
}

export default App;