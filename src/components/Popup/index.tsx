import React, { useState } from 'react';

interface PopupProps {
  titleBig: string;
  titleSmall1: string;
  titleSmall2: string;
  titleSmall3: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const Popup: React.FC<PopupProps> = ({ titleBig, titleSmall1, titleSmall2, titleSmall3, isOpen, onClose, className }) => {
  const [isActive, setIsActive] = useState(false); // Trạng thái checkbox

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 ${className}`} onClick={onClose}>
      <div className="flex justify-center items-center max-h-screen w-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] h-auto shadow-lg flex flex-col">
          <form className="w-full pt-3 px-6">
            <h2 className="text-center text-lg font-semibold mb-4">{titleBig}</h2>

            {/* Loại môn học */}
            <div className="flex flex-col md:flex-row items-center mb-4">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base text-center md:text-left">{titleSmall1}:</label>
              <input
                type="text"
                className="w-full md:w-9/12 p-2 rounded-lg text-black-text cursor-pointer bg-gray-100"
                defaultValue=""
                disabled={!isActive} // Vô hiệu hóa nếu isActive === false
              />
            </div>

            {/* Trạng thái */}
            <div className="flex flex-col md:flex-row items-center mb-4">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0 text-left">{titleSmall2}:</label>
              <div className="flex items-center gap-3 w-full md:w-9/12">
                <div
                  className={`relative w-12 h-6 rounded-full cursor-pointer ${isActive ? 'bg-blue-500' : 'bg-gray-300'}`}
                  onClick={() => setIsActive(!isActive)}
                >
                  <div
                    className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isActive ? 'translate-x-6' : 'translate-x-1'}`}
                  ></div>
                </div>
                <span className="text-sm">{isActive ? 'Đang hoạt động' : 'Vô hiệu hóa'}</span>
              </div>
            </div>

            {/* Ghi chú */}
            <div className="flex flex-col md:flex-row items-center mb-4">
              <label className="md:w-3/12 w-full text-black-text font-bold text-base text-center md:text-left">{titleSmall3}:</label>
              <input
                type="text"
                className="w-full md:w-9/12 p-2 rounded-lg text-black-text cursor-pointer bg-gray-100"
                defaultValue=""
                disabled={!isActive} // Vô hiệu hóa nếu isActive === false
              />
            </div>

            {/* Nút hành động */}
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <button
                type="button"
                onClick={onClose} // Gọi hàm đóng popup
                className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg"
              >
                Hủy
              </button>
              <button
                className={`w-full md:w-40 py-2 font-bold rounded-lg ${
                  isActive ? 'bg-orange-text text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!isActive} // Vô hiệu hóa nút nếu isActive === false
              >
                Lưu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
