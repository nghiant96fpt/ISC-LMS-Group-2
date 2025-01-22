import React, { useState } from 'react';
import "./style.css";

function FrameTime() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Dữ liệu mẫu cho tiết
  const items = [
    { title: "Tiết 1", time: "13:00" },
  ];
  return (
    <div className="container">
      <div className="card">
        <div className="card-2">
        <div className="title">{items[currentIndex].title}</div>

        </div>
        <div className="time">{items[currentIndex].time}</div>
      </div>
    
    </div>
  );
}

export default FrameTime;