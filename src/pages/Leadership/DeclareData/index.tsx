import React, { useState } from "react";
import { subjectGroups } from "./data";
import "./style.css";
const edit = require('../../../assets/icons/fi_edit.png');
const list = require('../../../assets/icons/fi_list.png');
const trash = require('../../../assets/icons/fi_trash-2.png');
const arrow = require('../../../assets/icons/u_arrow up down.png');
const search = require('../../../assets/icons/fi_search.png');
const left = require('../../../assets/icons/arrow left.png');
const right = require('../../../assets/icons/chevron_big_right.png');


const DeclareData: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(2);

  return (
    <div className="flex flex-col min-h-[802px] max-w-full bg-white shadow-lg rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-sans font-bold">Tổ - Bộ môn</h2>
        <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300">
          <img src={search} alt="Search" className="absolute left-3 w-6 h-6" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full h-[40px] pl-12 pr-4 rounded-[30px] border-none focus:ring-2 focus:ring-orange-500 italic"
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10">
        <table className="w-full border-collapse overflow-hidden rounded-t-lg">
          <thead className="bg-gradient-to-r from-orange-400 to-orange-600 text-white">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">
                <div className="flex items-center gap-2 font-sans">
                  <span>Tên tổ - bộ môn</span>
                  <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                </div>
              </th>
              <th className="py-3 px-2 md:px-4 text-left">
                <div className="flex items-center gap-2 font-sans">
                  <span>Trưởng bộ môn</span>
                  <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                </div>
              </th>
              <th className="py-3 px-2 md:px-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {subjectGroups.map((item, index) => (
              <tr key={index} className={`border-b ${index % 2 === 1 ? "bg-gray-100" : ""}`}>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text-text">{item.name}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text-text">{item.head}</td>
                <td className="py-3 px-2 md:px-4 text-center">
                  <div className="flex justify-center space-x-2 items-center">
                    <button className="w-8 h-8 flex items-center justify-center">
                      <img src={list} alt="List" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center">
                      <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center">
                      <img src={trash} alt="Trash" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Thanh phân trang */}
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-gray-600 italic text-sm gap-2">
        <div className="flex items-center space-x-2 font-sans">
          <span>Hiển thị</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-12 h-7 border border-orange-500 rounded-md text-center text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        <div className="flex space-x-1 md:space-x-2 items-center text-black-text-text text-sm font-sans">
          <button>
            <img src={left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
          <button className="text-black-text-text">1</button>
          <button className="w-[26px] h-[26px] rounded-full bg-orange-500 text-white flex items-center justify-center font-medium">
            2
          </button>
          <button className="text-black-text">3</button>
          <button className="text-black-text">...</button>
          <button className="text-black-text">100</button>
          <button>
            <img src={right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeclareData;
