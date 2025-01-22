import React, { useState } from 'react';
import "./style.css";
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

  

  return (
    <div className="container">
      <div className="card">
        <div className="card2">
        <div className="title">{items[currentIndex].title}</div>

        </div>
        <div className="time">{items[currentIndex].time}</div>
      </div>
    
    </div>
  );
}

export default FrameTime;