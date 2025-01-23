import React, { useState } from 'react';
import { TagProp } from './type';
import './style.css';

const TagLayout: React.FC<TagProp> = ({ text, isActive, onClick }) => {
  return (
    <div className={`tag ${isActive ? 'active' : 'inactive'}`} onClick={onClick}>
      {text}
    </div>
  );
};

const Tag: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleTagClick = (index: number) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const tags = ['Sample text', 'Sample text'];

  return (
    <div className="container">
      {tags.map((text, index) => (
        <TagLayout key={index} text={text} isActive={activeIndex === index} onClick={() => handleTagClick(index)} />
      ))}
    </div>
  );
};

export default Tag;
