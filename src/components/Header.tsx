import React from 'react';
import userCircle from '../assets/images/user_circle.png'; 

const Header = () => {
  return (
    <header className="bg-gray-100 shadow-md flex items-center justify-between px-6 py-4">
      <div></div>
      <div className="flex items-center space-x-4">
        <img src={userCircle} alt="User Avatar" className="w-10 h-10 rounded-full object-cover" />
        <span className="text-orange-500 font-semibold">Hiền Mai</span>
        <span className="border-l border-gray-500 h-6"></span>
        <button className="text-gray-700 font-medium hover:text-orange-500">Đăng xuất</button>
      </div>
    </header>
  );
};

export default Header;
