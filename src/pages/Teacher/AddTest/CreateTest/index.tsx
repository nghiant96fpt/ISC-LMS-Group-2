import React, { useState } from 'react';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import CheckboxComponent from '../../../../components/CheckBox';

const AddTest: React.FC = () => {
  const option_selectBlock = ['Khối 6', 'Khối 7', 'Khối 8'];
  const option_selectType = ['Kỳ 1'];
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setIsIndeterminate(false);
  };

  const toggleClass = (className: string) => {
    setSelectedClasses((prev) => (prev.includes(className) ? prev.filter((c) => c !== className) : [...prev, className]));
  };

  return (
    <div className="p-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <span>Bài kiểm tra</span>
        <span className="mx-2">&gt;</span>
        <span className="text-3xl font-bold text-black">Thêm bài kiểm tra mới</span>
      </div>

      {/* Form chính */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Chủ đề */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-semibold">Chủ đề</label>
            <input type="text" placeholder="Nhập chủ đề..." className="col-span-2 border border-gray-300 p-2 rounded-md w-full" />
          </div>

          {/* Hình thức kiểm tra */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-semibold">Hình thức</label>
            <div className="col-span-2 flex space-x-6">
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" className="w-5 h-5 accent-blue-500" />
                <span>Trắc nghiệm</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="type" className="w-5 h-5 accent-blue-500" />
                <span>Tự luận</span>
              </label>
            </div>
          </div>

          {/* Chọn khối */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-semibold">Khối</label>
            <div className="col-span-2 flex space-x-4">
              <DropdownSelectionComponent label="Chọn khối" options={option_selectBlock} width={144} />
              <CheckboxComponent label="Học kỳ 1" isChecked={isChecked} isIndeterminate={isIndeterminate} onChange={handleCheckboxChange} />
            </div>
          </div>

          {/* Chọn lớp */}
          <div className="grid grid-cols-3 items-center">
            <label className="font-semibold"></label>
            <div className="col-span-2 flex flex-wrap gap-2">
              {['10A1', '10A2', '10A3', '10A4'].map((className) => (
                <button
                  key={className}
                  onClick={() => toggleClass(className)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedClasses.includes(className) ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {className}
                </button>
              ))}
            </div>
          </div>

          {/* Thông tin thêm */}
          <div className="bg-gray-100 p-6 rounded-lg space-y-6">
            {/* Thời lượng */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold">Thời lượng</label>
              <div className="col-span-2 flex space-x-4">
                <input type="number" min="0" className="w-16 border border-gray-300 p-2 rounded-md" />
                <span>Giờ</span>
                <input type="number" min="0" max="59" className="w-16 border border-gray-300 p-2 rounded-md" />
                <span>Phút</span>
              </div>
            </div>

            {/* Phân loại */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold">Phân loại</label>
              <DropdownSelectionComponent label="Chọn phân loại" options={option_selectType} width={144} />
            </div>

            {/* Ngày bắt đầu */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold">Ngày bắt đầu</label>
              <div className="col-span-2 flex space-x-4">
                <input type="date" className="border border-gray-300 p-2 rounded-md w-full" />
                <input type="time" className="border border-gray-300 p-2 rounded-md w-full" />
              </div>
            </div>

            {/* Ngày kết thúc */}
            <div className="grid grid-cols-3 items-center">
              <label className="font-semibold">Ngày kết thúc</label>
              <div className="col-span-2 flex space-x-4">
                <input type="date" className="border border-gray-300 p-2 rounded-md w-full" />
                <input type="time" className="border border-gray-300 p-2 rounded-md w-full" />
              </div>
            </div>
          </div>

          {/* Nút Lưu */}
          <div className="text-center mt-6">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">Lưu bài kiểm tra</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTest;
