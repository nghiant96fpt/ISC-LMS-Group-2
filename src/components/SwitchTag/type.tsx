import React from 'react';
import ReactDOM from 'react-dom/client';
import SwitchTab from '.';

const tabs = [
  { id: 0, label: 'Sample text 1' },
  { id: 1, label: 'Sample text 2' },
];

// Gọi lại file này để sử dụng Switch Tab.
const Type = () => {
  const handleTabChange = (id: number) => {};

  return (
    <div style={{ padding: '20px' }}>
      <SwitchTab tabs={tabs} defaultActiveTab={0} onTabChange={handleTabChange} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<Type />);

export default Type;
