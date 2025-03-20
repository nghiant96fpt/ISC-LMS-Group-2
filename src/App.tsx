import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import store from './redux/store';
import './styles/tailwind.scss';
import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';
import LedershipRoutes from './routes/LeadershipRoutes';
import Login from './pages/Student/Login/Login';
import { CookiesProvider } from 'react-cookie';
function App() {
  return (
    <CookiesProvider>
      <div className="App">
        <Provider store={store}>
          {/* Gr01 - Hoài Thọ: <AppRoutes/> hoặc các component nếu muốn sử dụng redux phải nằm trong này ! */}
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/student" replace />} />
              <Route path="/student/*" element={<StudentRoutes />} />
              <Route path="/teacher/*" element={<TeacherRoutes />} />
              <Route path="/leadership/*" element={<LedershipRoutes />} />
              <Route path="/login" element={<Login isLogin={true} />} />
              <Route path="/reset" element={<Login isLogin={false} />} />
            </Routes>
          </Router>
        </Provider>
      </div>
    </CookiesProvider>
  );
}

export default App;
