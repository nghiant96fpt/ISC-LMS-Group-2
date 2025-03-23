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
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Provider store={store}>
        {/* Gr01 - Hoài Thọ: <AppRoutes/> hoặc các component nếu muốn sử dụng redux phải nằm trong này ! */}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/student" replace />} />
            <Route path="/student/*" element={<StudentRoutes />} />
            <Route path="/teacher/*" element={<TeacherRoutes />} />
            <Route path="/leadership/*" element={<LedershipRoutes />} />
            <Route path="/login" element={<Login isLogin />} />
            <Route path="/reset" element={<Login isLogin={false} />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
