import React, { useState } from 'react';
import './style.css';
import { SwitchTagProps } from './type';

const SwitchTag: React.FC<SwitchTagProps> = ({ options, onTabChange }) => {
  const { labels, defaultActiveTab = 0 } = options;
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    if (onTabChange) onTabChange(id);
  };

  return (
    <div className="switch-tab">
      {labels.map((label, index) => (
        <button key={index} className={`tab-button ${activeTab === index ? 'active' : ''}`} onClick={() => handleTabClick(index)}>
          {label}
        </button>
      ))}
    </div>
  );
};

export default SwitchTag;
