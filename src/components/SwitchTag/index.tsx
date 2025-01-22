import React, { useState } from 'react';
import './style.css';

type Tab = {
  id: number;
  label: string;
};

type SwitchTabProps = {
  tabs: Tab[];
  defaultActiveTab?: number;
  onTabChange?: (id: number) => void;
};

const SwitchTag: React.FC<SwitchTabProps> = ({ tabs, defaultActiveTab = 0, onTabChange }) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    if (onTabChange) onTabChange(id);
  };

  return (
    <div className="switch-tab">
      {tabs.map((tab) => (
        <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => handleTabClick(tab.id)}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default SwitchTag;
