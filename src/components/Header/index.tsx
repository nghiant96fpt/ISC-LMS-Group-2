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
            <span className="text-[var(--orange-text)] font-bold">Hiền Mai</span>
            <span className="border-l h-6" style={{ borderColor: '#823B00' }}></span>
            <button
              className="text-[var(--grey-text)] font-medium underline hover:text-grey-500"
              style={{ textUnderlineOffset: '5px' }}
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <button
              className="text-[var(--orange-text)]  font-bold underline hover:[var(--orange-text)] "
              style={{ textUnderlineOffset: '5px' }}
              onClick={handleLogin}
            >
              Đăng nhập
            </button>
            <span className="border-l h-6" style={{ borderColor: '#823B00' }}></span>
            <button className="text-[var(--orange-text)]  font-medium underline hover:text-[var(--orange-text)] " style={{ textUnderlineOffset: '5px' }}>
              Đăng ký
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
