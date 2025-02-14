import { useState } from 'react';
import { Icons } from './Icons';
import { SchoolYearData } from './type';

const SchoolYear = () => {
  const [data, setData] = useState<SchoolYearData[]>([
    { id: 1, year: '2020-2021', start: '05/10/2020', end: '05/10/2021' },
    { id: 2, year: '2019-2020', start: '05/10/2019', end: '05/10/2020' },
    { id: 3, year: '2018-2019', start: '05/10/2018', end: '05/10/2019' },
    { id: 4, year: '2017-2018', start: '05/10/2017', end: '05/10/2018' },
    { id: 5, year: '2016-2017', start: '05/10/2016', end: '05/10/2017' },
  ]);

  return (
    //   md:w-[1337px] md:h-[812px]
    <div className=" py-6 px-14 bg-background-white shadow-custom rounded-[16px]">
      {/* Tiêu đề / tìm kiếm */}
      <div className="flex justify-between items-center text-black-text mb-4">
        <h2 className="text-[22px] leading-[--line-height-Mulish-3] font-[--weight-Mulish]">Niên khóa</h2>

        <div className="relative w-full max-w-sm">
          <img src={Icons.search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full  font-[--font-Source-Sans-Pro] font-[weight-Source-Sans-Pro-3] px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none  focus:border-[--border-orange]"
          />
        </div>
      </div>

      {/* Bảng */}
      <table className="w-full   overflow-hidden rounded-t-lg">
        <thead className=" h-10 text-[18px]  bg-gradient-to-r from-[#F17F21] to-[#FF5400] text-while-text">
          <tr className="">
            <th className="p-3 first:rounded-tl-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">STT</span>
                <div className="flex flex-col items-center justify-center gap-1">
                  <img src={Icons.arrow_up_icon} className="w-2 h-1.5 ml-[1px]" alt="Up" />
                  <img src={Icons.arrow_down_icon} className="w-2 h-1.5 " alt="Down" />
                </div>
              </div>
            </th>

            <th className="p-3 first:rounded-tl-lg">
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold">Niên khóa</span>
                <div className="flex flex-col items-center justify-center gap-1">
                  <img src={Icons.arrow_up_icon} className="w-2 h-1.5 ml-[1px]" alt="Up" />
                  <img src={Icons.arrow_down_icon} className="w-2 h-1.5 " alt="Down" />
                </div>
              </div>
            </th>
            <th className="p-3">Thời gian bắt đầu</th>
            <th className="p-3">Thời gian kết thúc</th>
            <th className="p-3 last:rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="text-center odd:bg-gray-100 even:bg-white">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border">{row.year}</td>
              <td className="p-3 border">{row.start}</td>
              <td className="p-3 border">{row.end}</td>
              <td className="p-3 border flex justify-center gap-2">
                <button className="text-orange-500 hover:text-orange-700">
                  <img src={Icons.pencil_icon} alt="edit icon" className="w-5 h-5" />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <img src={Icons.trash_icon} alt="remove icon" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm">Hiển thị 8 hàng trong mỗi trang</span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded bg-gray-200">1</button>
          <button className="px-3 py-1 border rounded bg-orange-500 text-white">2</button>
          <button className="px-3 py-1 border rounded bg-gray-200">3</button>
          <span>...</span>
          <button className="px-3 py-1 border rounded bg-gray-200">100</button>
        </div>
      </div>
    </div>
  );
};

export default SchoolYear;
