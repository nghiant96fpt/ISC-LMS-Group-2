import React, { useState } from 'react';
import userCircle from '../../assets/images/people/user_circle.png';
import './style.css';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <header className="header">
      <div></div>
      <div className="user-section">
        {isLoggedIn ? (
          <>
            <img src={userCircle} alt="User Avatar" className="user-avatar" />
            <span className="user-name">Hiền Mai</span>
            <span className="divider"></span>
            <button className="logout-button" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button className="login-button" onClick={handleLogin}>
              Đăng nhập
            </button>
            <span className="divider"></span>
            <button className="register-button">Đăng ký</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
