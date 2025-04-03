import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userCircle from '../../assets/images/people/user_circle.png';
import './style.css';
import { Cookies, useCookies } from 'react-cookie';
import { AuthContext } from '../../pages/Student/Login/AuthContext';
import Loading from '../Loading';


const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const navigator = useNavigate();
  const handleLogin = () => {
    setIsLoggedIn(true);
    navigator('/login');
  };

  const [cookies, setCookie, removeCookie] = useCookies(['accessToken', 'refreshToken']);
  const {setRole} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const handleLogout = () => {
    setLoading(true);
    removeCookie('accessToken');
    removeCookie('refreshToken');
    setRole(null);
    setLoading(false);
  }

  return (
    <header className="header">
      <Loading isLoading={loading}/>
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
