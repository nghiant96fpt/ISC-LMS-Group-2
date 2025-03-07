import React, { useState } from 'react';
import questionData from './data';
import icon from './icon';

const Question: React.FC = () => {
  const [isReplying, setIsReplying] = useState(false);

  return (
    <div className="mt-3 rounded-lg shadow-lg w-full h-[600px] mx-auto">
      <div className="p-3 overflow-y-auto max-h-[600px]">
        {questionData.map((item) => (
          <div key={item.id} className="mb-4 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img src={item.avatar} alt={item.author} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h2 className="text-sm font-bold text-orange-text">{item.author}</h2>
                  <p className="text-xs text-grey-text">
                    {item.date} <span className="ms-6">{item.time}</span>
                  </p>
                </div>
              </div>
              {!isReplying ? (
                <button
                  children="Trả lời"
                  className="w-24 h-8 font-bold bg-[#FFD8B8] text-black-text border border-border-orange rounded-md"
                  onClick={() => setIsReplying(true)}
                />
              ) : (
                <button
                  children="Hủy"
                  className="w-24 h-8 font-bold text-orange-text"
                  onClick={() => setIsReplying(false)}
                />
              )}
            </div>
            <p className="ml-10 text-black-text mb-10">{item.question}</p>
            {item.replies && item.replies.length > 0 && (
              <div>
                {item.replies.map((reply) => (
                  <div key={reply.id} className="ml-10 border-l border-border-gray pl-4 mb-6">
                    <div className="mb-2">
                      <div className="flex items-center mb-1">
                        <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full mr-2" />
                        <div>
                          <h3 className="text-sm font-bold text-orange-text">
                            {reply.author} <span className="text-grey-text font-normal">— {reply.role}</span>
                          </h3>
                          <p className="text-xs text-grey-text">
                            {reply.date} • {reply.time}
                          </p>
                        </div>
                      </div>
                      <p className="text-black-text text-sm">{reply.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {isReplying && (
          <div className="flex items-start border border-gray-300 rounded-lg p-3 mt-28 w-full">
            <img
              src={icon.u_paperclip}
              alt="Icon"
              className="w-6 h-6 mt-1 opacity-50 filter invert-[40%] sepia-[80%] saturate-[500%] hue-rotate-[10deg] brightness-[90%] contrast-[90%]"
            />
            <textarea
              placeholder="Nhập câu trả lời..."
              className="flex-1 outline-none bg-transparent text-gray-600 resize-none p-2 mx-3"
              rows={3}
            />
            <button className="text-orange-500">
              <img src={icon.send} alt="icon" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
