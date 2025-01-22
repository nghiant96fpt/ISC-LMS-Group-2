import React, { useState } from 'react';
import "./style.css";

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
        <button className="nav-button" onClick={handlePrev} disabled={currentIndex === 0}>Trước</button>
        <button className="nav-button" onClick={handleNext} disabled={currentIndex === items.length - 1}>Sau</button>
      </div>
    </div>
  );
}

export default FrameTime;