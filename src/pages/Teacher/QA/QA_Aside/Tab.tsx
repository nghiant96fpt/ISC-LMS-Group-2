import React from 'react';

interface TabProps {
  tabId: number;
  TabChoose: number;
  title: string;
  tag: string | number;
  handleChangTab: (id: number) => void;
}
const Tab: React.FC<TabProps> = ({ tabId, TabChoose, title, tag, handleChangTab }) => {
  return (
    <div
      onClick={() => handleChangTab(tabId)}
      className={`cursor-pointer flex items-center gap-2 p-2 pl-4 pr-4 ${
        tabId === TabChoose ? 'border border-orange-800 font-bold' : 'text-gray-400'
      } rounded-md inline-flex mr-3`}
    >
      <div>{title}</div>
      {tabId === TabChoose && (
        <div className="w-7 h-7 bg-orange-600 text-white font-bold text-sm flex items-center justify-center rounded-full">{tag}</div>
      )}
    </div>
  );
};

export default Tab;
