import React from 'react';
import ChatType from './ChatCardType';
const ChatCart: React.FC<ChatType> = ({ cardData, cardIndexChoose, handleClick, index }) => {
  return (
    <div
      onClick={handleClick}
      key={index}
      className={`flex items-center ${index === cardIndexChoose ? 'bg-gray-100' : ''} p-3 rounded-xl cursor-pointer transition ${
        index === cardIndexChoose ? '' : 'hover:bg-gray-100'
      }`}
    >
      {/* Ảnh đại diện */}
      <div className="relative">
        <img src={cardData.avatar} alt={cardData.name} className="w-12 h-12 rounded-full object-cover" />
        {cardData.active && <span className="absolute top-0 right-0 w-3 h-3 bg-orange-500 rounded-full"></span>}
      </div>

      {/* Nội dung chat */}
      <div className="flex-1 ml-3">
        <div className="font-bold text-gray-900">{cardData.name}</div>
        <div className="text-gray-500 text-sm truncate">{cardData.message}</div>
      </div>

      {/* Thông tin thời gian và số lượt xem */}
      <div className="text-gray-400 text-sm flex flex-col items-end">
        <span className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 5C7.45455 5 3.54545 8.18182 2 12C3.54545 15.8182 7.45455 19 12 19C16.5455 19 20.4545 15.8182 22 12C20.4545 8.18182 16.5455 5 12 5ZM12 17C8.63636 17 5.81818 14.5455 4.54545 12C5.81818 9.45455 8.63636 7 12 7C15.3636 7 18.1818 9.45455 19.4545 12C18.1818 14.5455 15.3636 17 12 17ZM12 9C9.81818 9 8 10.8182 8 13C8 15.1818 9.81818 17 12 17C14.1818 17 16 15.1818 16 13C16 10.8182 14.1818 9 12 9ZM12 15C10.9091 15 10 14.0909 10 13C10 11.9091 10.9091 11 12 11C13.0909 11 14 11.9091 14 13C14 14.0909 13.0909 15 12 15Z"
              fill="currentColor"
            />
          </svg>
          {cardData.seen}
        </span>
        <span>{cardData.time}</span>
      </div>
    </div>
  );
};
export default ChatCart;
