import React, { useState } from 'react';
import Button from '../../../../components/Button';
import { SearchData, IFileOption } from './type';
import { IconArrowCaretDown } from '../../../../components/Icons';

const SearchResult: React.FC = () => {
  // Dữ liệu mẫu
  const [searchData] = useState<SearchData>({
    subject: 'Ngữ Văn',
    class: '10C1',
    classId: '134 2665 3563',
    startTime: 'Thứ 6, 20/10/2020',
    startHour: '13:00 (GMT +7 Bangkok)',
  });

  const fileOptions: IFileOption[] = [
    { value: 'xlsx', label: 'Excel -.xlsx' },
    { value: 'pdf', label: 'PDF -.pdf' },
    { value: 'csv', label: 'CSV -.csv' },
  ];

  // State cho dropdown
  const [selectedFile, setSelectedFile] = useState<string>(fileOptions[0].label);
  const [isFileDropdownOpen, setIsFileDropdownOpen] = useState<boolean>(false);

  return (
    <div className="p-4 border border-orange-300 rounded-md bg-orange-50">
      <div className="flex justify-between">
        {/* Thông tin lớp học */}
        <div className="space-y-2">
          <p>
            <span className="font-semibold">Môn học:</span> {searchData.subject}
          </p>
          <p>
            <span className="font-semibold">Lớp:</span> {searchData.class}
          </p>
          <p>
            <span className="font-semibold">Mã lớp:</span> {searchData.classId}
          </p>
        </div>

        {/* Thời gian bắt đầu */}
        <div>
          <p>
            <span className="font-semibold">Thời gian bắt đầu:</span> {searchData.startTime}
          </p>
          <p className="ml-24">{searchData.startHour}</p>
        </div>

        {/* Nút Xuất file */}
        <div className="text-right">
          <p className="font-semibold mb-2 text-start">In bảng điểm:</p>
          <div className="flex items-center space-x-2">
            <Button className="w-[113px] h-[32px] border border-orange-400 bg-orange-100 text-orange-500 rounded-md hover:bg-orange-200">Xuất file</Button>

            {/* Dropdown Xuất File */}

            <div className="relative" style={{ width: '136px', height: '32px' }} onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}>
              {/* Ô chọn */}
              <div className="border border-gray-300 rounded px-3 h-[32px] bg-white flex justify-between items-center cursor-pointer">

                <span className="text-left">{selectedFile}</span>
             <div data-svg-wrapper>
                      <IconArrowCaretDown />
                    </div>
              </div>

              {/* Danh sách dropdown */}
              {isFileDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
                  {fileOptions.map((option, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-left"
                      onClick={() => {
                        setSelectedFile(option.label);
                        setIsFileDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
