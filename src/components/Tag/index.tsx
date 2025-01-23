import React from 'react';
import { TagProps } from './type';
import './style.css'; // Keep this import

const Tag: React.FC<TagProps> = ({ text, isActive }) => {
  return <div className={`tag ${isActive ? 'active' : 'inactive'}`}>{text}</div>;
};

const App: React.FC = () => {
  return (
    <div className="container">
      <Tag text="Sample text" isActive={true} />
      <Tag text="Sample text" isActive={false} />
    </div>
  );
};

export default App;
