import React, { useState, useEffect } from 'react';
import StudentList from './StudentList';
import SharedScreen from './SharedScreen';
import ClassShare from './ClassShare';
import Login from './FormLogin';
import './style.scss';
import { students, students_add } from './data/data';

const JoinClass = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Kiểm tra thông tin đăng nhập từ localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <>
      {isAuthenticated ? (
        <div className="joinClass-container">
          <StudentList students={students} students_add={students_add} />
          <div className="joinClass-conten">
            <SharedScreen />
            <ClassShare />
          </div>
        </div>
      ) : (
        <Login onLogin={() => setIsAuthenticated(true)} />
      )}
    </>
  );
};

export default JoinClass;
