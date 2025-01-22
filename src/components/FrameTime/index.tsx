import React, { useState } from 'react';
import "./style.css";
import iconCalendar from '../../../src/assets/icons/icon-calendar.png';
import iconArrowLeft from '../../../src/assets/icons/icon-arrow-left.png';
import iconArrowRight from '../../../src/assets/icons/icon-arrow-right.png';

function FrameTime() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dữ liệu mẫu cho tiết
  const items = [
    { title: "Tiết 1", time: "13:00" },
    { title: "Tiết 2", time: "14:00" },
    { title: "Tiết 3", time: "15:00" },
    { title: "Tiết 4", time: "16:00" },
  ];

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="title">{items[currentIndex].title}</div>
        <div className="time">{items[currentIndex].time}</div>
      </div>
      <div className="pagination">
        <img 
          src={iconArrowLeft} 
          alt="Previous" 
          className={`nav-icon ${currentIndex === 0 ? 'disabled' : ''}`} 
          onClick={handlePrev} 
        />
        /
        <img 
          src={iconArrowRight} 
          alt="Next" 
          className={`nav-icon ${currentIndex === items.length - 1 ? 'disabled' : ''}`} 
          onClick={handleNext} 
        />
      </div>
    </div>
  );
}

export default FrameTime;