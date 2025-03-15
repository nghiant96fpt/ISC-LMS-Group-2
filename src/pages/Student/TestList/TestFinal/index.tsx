import React, { useState } from 'react';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import SearchInputProps from '../../../../components/SearchInput';
import icon from '../icon';
import CalendarInput from '../../../../components/CalendarInput/index';
import data from '../Types/data';
import Button from '../../../../components/Button';

const TestFinal: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const subjectOptions = ['Tiếng Anh', 'Toán'];
  const number = ['Khối 1', 'Khối 2', 'Khối 3', 'Khối 4', 'Khối 5'];
  const [itemsPerPage, setItemsPerPage] = useState(8);
  return (
    <div className="block h-full w-full">
      {/* Bộ lọc */}
      <div className="flex items-center justify-between mb-6 px-2 md:px-10 w-full">
        <div className="flex space-x-2">
          <div>
            <div className="text-lg font-bold">Chọn bộ môn</div>
            <DropdownSelectionComponent width={'10rem'} placeholder="Chọn bộ môn..." options={subjectOptions} />
          </div>
          <div>
            <div className="text-lg font-bold">Chọn khối</div>
            <DropdownSelectionComponent width={'6rem'} placeholder="Chọn khối..." options={number} />
          </div>
          <div>
            <div className="text-lg font-bold">Chọn ngày</div>
            <CalendarInput popupStyle={{ top: '28.1em' }} selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
          <div className="mt-5">
            <Button children={'Lọc kết quả'} className="primary btn-custom" />
          </div>
        </div>
        <SearchInputProps placeholder="Tìm kiếm theo topic..." />
      </div>

      {/* Bảng hiển thị */}
      <div className="px-2 md:px-10 h-80 w-full">
        <div className="relative w-full border rounded-lg overflow-hidden">
          <table className="table-auto min-w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
              <tr>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">
                  <div className="flex items-center gap-2">
                    <span>Lớp</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                  </div>
                </th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Nội dung kiểm tra</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">
                  <div className="flex items-center gap-2">
                    <span>Môn học</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" />
                  </div>
                </th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Ngày làm bài</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Thời lượng</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Tình trạng</th>
                <th className="py-2 px-4 text-left text-sm md:text-base font-semibold w-1/7">Bài làm</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            {/* Body */}
            <tbody className="max-h-48 overflow-y-auto">
              {data
                .filter((item) => item.status === 'Đã hoàn thành' || item.action === 'Đã nộp bài')
                .map((item, index) => (
                  <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                    <td className="h-">{item.subject}</td>
                    <td className="">{item.content}</td>
                    <td className="">{item.teacher}</td>
                    <td className="">{item.examDate}</td>
                    <td className="">{item.duration}</td>
                    <td
                      className={` text-left italic ${
                        item.status === 'Đang tiến hành'
                          ? 'text-blue-500'
                          : item.status === 'Chưa bắt đầu'
                          ? 'text-red-500'
                          : item.status === 'Không nộp bài'
                          ? 'text-green-500'
                          : 'text-gray-500'
                      }`}
                    >
                      {item.status}
                    </td>
                    <td
                      className={` text-left italic ${
                        item.action === 'Đang thực hiện'
                          ? 'text-blue-500'
                          : item.action === 'Chưa bắt đầu'
                          ? 'text-red-500'
                          : item.action === 'Không nộp bài'
                          ? 'text-gray-500'
                          : 'text-green-500'
                      }`}
                    >
                      {item.action !== 'Bắt đầu' ? item.action : null}

                      {item.action === 'Bắt đầu' && (
                        <Button className="ml-2 primary" size="mini">
                          {item.action}
                        </Button>
                      )}
                    </td>

                    <td className="text-left">
                      <img src={icon.infoOutline} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text italic text-sm gap-2">
        <div className="flex items-center space-x-2">
          <span>Hiển thị</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="w-12 h-7 border border-border-orange rounded-md text-center focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm">
          <button>
            <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
          <button className="text-black-text">1</button>
          <button className="w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium">
            2
          </button>
          <button className="text-black">3</button>
          <button className="text-black">...</button>
          <button className="text-black">100</button>
          <button>
            <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestFinal;
