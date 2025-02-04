import React, { useState } from 'react';
import { StarProps } from './type';
import StarIcon from './StarIcon';
import './style.css';

const Star: React.FC<StarProps> = ({ selected, toggleSelect }) => {

  const handleClick = () => {
    toggleSelect();
  };

  return (
    <div className={`starContainer`} onClick={handleClick}>
      <img
        src={selected ? StarIcon.StarTrue : StarIcon.StarFalse}
        alt={selected ? 'ngôi sao đã chọn' : 'ngôi sao chưa chọn'}
        className="starImage"
      />
    </div>
  );
};

export default Star;