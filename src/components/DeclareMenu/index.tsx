import React, { useState } from 'react';
import './style.scss';
// import { OptiosnMenuProps } from './type';
import { Link } from 'react-router-dom';

const DeclareMenu: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState('THCS');
  const [selectedYear, setSelectedYear] = useState('2020 - 2021');
  const [activeMenu, setActiveMenu] = useState('Niên khóa');

  const menuItems = [
    { label: 'Niên khóa', path: '#' },
    { label: 'Tổ - Bộ môn', path: '#' },
    { label: 'Khoa - Khối', path: '#' },
    { label: 'Môn học', path: '#' },
    { label: 'Lớp học', path: '#' },
    { label: 'Loại điểm', path: '#' },
  ];

  return (
    <div className="declare-menu">
      <div className="menu-content">
        <div className="menu-select">
          <label>Đang chọn xem:</label>
        </div>
        <div className="menu-select">
          <label>Trường:</label>
          <select value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)}>
            <option value="THCS">THCS</option>
            <option value="THPT">THPT</option>
            <option value="CH">CH</option>
          </select>
        </div>
        <div className="menu-select">
          <label>Niên khóa:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="2020 - 2021">2020 - 2021</option>
            <option value="2015 - 2016">2015 - 2016</option>
            <option value="2016 - 2018">2016 - 2018</option>
          </select>
        </div>
      </div>
      <div className="menu-list">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`menu-item ${activeMenu === item.label ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.label)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DeclareMenu;
