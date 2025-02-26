import React from 'react';
import './style.scss';
import Button from '../Button';

const HeaderOption: React.FC = () => {
  return (
    <div className="header-container">
      <header className="header">
        <p>Khai Báo Dữ Liệu</p>
      </header>
      <div className="button-container">
        <Button className="primary" size="big" icon>
          Thêm mới
        </Button>
      </div>
    </div>
  );
};

export default HeaderOption;
