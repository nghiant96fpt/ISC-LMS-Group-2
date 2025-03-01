import React from 'react';
import { PaginationControlsProps } from './type';

import leftIcon from '../../assets/icons/arrow left.png';
import rightIcon from '../../assets/icons/chevron_big_right.png';

const PaginationControls: React.FC<PaginationControlsProps> = ({ itemsPerPage, setItemsPerPage, onPageChange, currentPage, totalPages }) => {
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
      <div className="flex items-center space-x-2 font-sans">
        <span>Hiển thị</span>
        <input
          type="number"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
        />
        <span>hàng trong mỗi trang</span>
      </div>

      <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <img src={leftIcon} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-[26px] h-[26px] rounded-full flex items-center justify-center font-medium ${
              currentPage === page ? 'bg-background-orange-1 text-while-text' : 'text-black-text'
            }`}
          >
            {page}
          </button>
        ))}

        <button className="text-black">...</button>

        <button onClick={() => onPageChange(totalPages)} className={`text-black ${currentPage === totalPages ? 'font-bold' : ''}`}>
          {totalPages}
        </button>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <img src={rightIcon} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;
