import { useState } from 'react';
import { WorkHistory } from './Types';
import { workHistoryData } from './data';
import arrow_right from '../../../../assets/icons/icon-arrow-right.png';
import arrow_down from '../../../../assets/icons/caret-down_white.png';
import edit from '../../../../assets/icons/orange_edit_write_outline.png';
import fi_trash from '../../../../assets/icons/icon-fi_trash-2.png';
import fi_search from '../../../../assets/icons/fi_search.png';
import fi_plus from '../../../../assets/icons/fi_plus.png';
const Workprocess = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleEdit = (data: WorkHistory) => {
    console.log('Edit', data);
  };

  const handleDelete = (data: WorkHistory) => {
    console.log('Delete', data);
  };

  return (
    <div className="overflow-x-auto flex-grow px-2 md:px-10">
      <div className="border rounded-lg shadow-md overflow-hidden">
        <button
          onClick={toggleSection.bind(this, 'work')}
          className={` w-full h-[58px] text-left px-4 py-2 font-semibold flex items-center justify-between transition-colors 
        ${openSection === 'work' ? 'bg-orange-500 text-white' : 'bg-white text-black-text border border-slate-100'}`}
        >
          <span className="flex items-center  gap-2">
            {openSection === 'work' ? (
              <img src={arrow_down} alt="arrow down" className="w-5 h-3 transition-transform" />
            ) : (
              <img src={arrow_right} alt="arrow right" className="w-3 h-5 transition-transform" />
            )}
            Quá trình công tác
          </span>
        </button>

        {openSection === 'work' && (
          <div className="p-4 w-[95%] mx-auto  ">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
              {/* Ô tìm kiếm */}
              <div className="w-[438px] h-10 relative">
                <img src={fi_search} alt="Search" className="absolute left-4 top-1/2 w-5 h-5 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  className="border p-2 rounded-full w-full italic pl-10"
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Nút thêm */}
              <button className="w-[101px] h-8 bg-orange-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <img src={fi_plus} alt="fi_plus" />
                Thêm
              </button>
            </div>

            {/* Bảng dữ liệu */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border rounded-lg text-center overflow-hidden">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2">Cơ quan/ Đơn vị</th>
                    <th className="p-2">Tổ/ Bộ môn</th>
                    <th className="p-2">Chức vụ</th>
                    <th className="p-2">Ngày bắt đầu</th>
                    <th className="p-2">Ngày kết thúc</th>
                    <th className="p-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {workHistoryData
                    .filter((row) => row.unit.toLowerCase().includes(searchText.toLowerCase()))
                    .map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                        <td className="p-2 ">{row.unit}</td>
                        <td className="p-2 ">{row.dept}</td>
                        <td className="p-2 ">{row.role}</td>
                        <td className="p-2 ">{row.start}</td>
                        <td className="p-2 ">{row.end}</td>
                        <td className="p-2 text-center whitespace-nowrap space-x-4">
                          {' '}
                          <button onClick={handleEdit.bind(this, row)}>
                            <img src={edit} alt="edit" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                          </button>
                          <button onClick={handleDelete.bind(this, row)}>
                            <img src={fi_trash} alt="delete" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Thông tin đào tạo */}
      <div className="border rounded-lg shadow-md overflow-hidden mt-4">
        <button
          onClick={toggleSection.bind(this, 'education')}
          className="w-full bg-gray-200 text-left px-4 py-2 font-semibold flex items-center justify-between"
        >
          Thông tin đào tạo
          <span>{openSection === 'education' ? '▼' : '▶'}</span>
        </button>
      </div>
    </div>
  );
};

export default Workprocess;
