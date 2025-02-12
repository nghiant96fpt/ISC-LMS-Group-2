import React from 'react';
import './style.css';
import { SwitchTagProps } from './type';

const SwitchTag: React.FC<SwitchTagProps> = ({ options, activeTab, handleTabClick }) => {
  const { labels } = options;

  return (
    <div className="switch-tab">
      {labels.map((label, index) => {
        const isActive = activeTab === index;
        return (
          <button key={index} className={isActive ? 'tab-button active' : 'tab-button'} onClick={handleTabClick.bind(null, index)}>
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default SwitchTag;
