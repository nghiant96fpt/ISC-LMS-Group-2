import React, { useState } from 'react';
import userCircle from '../../assets/images/people/user_circle.png';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <header className=" flex items-center justify-between px-6 py-4 h-16">
      <div></div>
      <div className="flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <img src={userCircle} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
            <span className="text-gray-500 font-semibold">Hiền Mai</span>
            <span className="border-l h-6" style={{ borderColor: '#823B00' }}></span>
            <button
              className="text-orange-500 font-medium underline hover:text-orange-500"
              style={{ textUnderlineOffset: '5px' }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button
              className="text-orange-500 font-bold underline hover:text-orange-500"
              style={{ textUnderlineOffset: '5px' }}
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <span className="border-l h-6" style={{ borderColor: '#823B00' }}></span>
            <button className="text-orange-500 font-medium underline hover:text-orange-500" style={{ textUnderlineOffset: '5px' }}>
              Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
