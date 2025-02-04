import React, { useState } from 'react';
import "./style.css";

export interface Item {
  title: string;
  time: string;
}

interface FrameTimeProps {
  items: Item[];
}

function FrameTime({ items }: FrameTimeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="container">
      <div className="card">
        <div className="card-2">
          <div className="title">{items[currentIndex]?.title}</div>
        </div>
        <div className="time">{items[currentIndex]?.time}</div>
      </div>
    </div>
  );
}

export default FrameTime;