import './App.css';
import TagLayout from './components/Tag/index';
import { useState } from 'react';

function App() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const handleTagClick = (index: number) => () => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const tags = ['Sample text', 'Sample text'];

  return (
    <>
      {tags.map((text, index) => (
        <TagLayout key={index} text={text} isActive={activeIndex === index} onClick={handleTagClick(index)} />
      ))}
    </>
  );
}

export default App;
