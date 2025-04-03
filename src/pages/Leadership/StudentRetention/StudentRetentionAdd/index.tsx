import Button from '../../../../components/Button';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import CalendarInput from '../../../../components/CalendarInput';
import search from '../../../../assets/icons/fi_search_primary.png';
import tep from '../../../../assets/icons/u_paperclip.png';
import DateInput from '../../Exams/CreateExamSchedule/Date';
import dayjs from 'dayjs';

const StudentRetentionAdd = () => {
  const { register, handleSubmit } = useForm();
  const [fileName, setFileName] = useState('');
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="w-full mx-auto bg-white  rounded-lg shadow-md max-w-3xl mt-10 p-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Thêm bảo lưu</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Lớp hiện tại */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium mb-1 md:mb-0">Lớp hiện tại:</label>
          <DropdownSelectionComponent width="585px" placeholder="Lựa chọn" options={['Cần Thơ', 'Đà Nẵng', 'Cà Mau']} />
        </div>

        {/* Tên học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium mb-1 md:mb-0">
            Tên học viên: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full md:w-[585px]">
            <input
              {...register('studentName')}
              placeholder="Nguyễn Văn Phúc"
              className="w-full p-2 bg-[#F2F2F2]   rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />

            <img src={search} className="absolute right-3 top-2 text-gray-400 size-6" alt="icon tìm kiếm" />
          </div>
        </div>

        {/* Ngày bảo lưu và Học kỳ */}
        <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-5">
          <div className="flex items-center w-full md:w-[585px]">
            <label className="font-medium md:mr-5 w-[150px]">
              Ngày bảo lưu: <span className="text-red-500">*</span>
            </label>
            <div className="relative w-full custom-input">
              <DateInput value={date} onChange={setDate} width="250px" className="custom-class" style={{ borderColor: 'red' }} />
            </div>
          </div>

          <div className="flex items-center bg-gray-200 px-3 py-2 rounded w-full md:w-auto">
            <select {...register('semester')} className="bg-transparent focus:outline-none w-full">
              <option>Học kỳ I</option>
              <option>Học kỳ II</option>
            </select>
          </div>
        </div>

        {/* Lý do bảo lưu */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <label className="block font-medium mb-1 md:mb-0">
            Lý do bảo lưu: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <textarea
              {...register('reason')}
              placeholder=""
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            <p className="text-sm text-gray-500 font-thin italic">Kết quả học tập của viên sẽ được bảo lưu trong hồ sơ học viên.</p>
          </div>
        </div>

        {/* Tệp đính kèm */}

        <div className="flex flex-row items-center justify-between gap-4">
          {/* Label */}
          <label className="font-medium">
            Tệp đính kèm: <span className="text-red-500">*</span>
          </label>

          {/* Ô nhập và nút */}
          <div className="w-full md:w-[585px] flex items-center space-x-2">
            {/* Ô hiển thị tệp */}
            <div className="flex items-center border rounded px-3 bg-[#F2F2F2] h-10 flex-grow">
              <img src={tep} alt="icon" className="w-7 h-5 border-r-2 pr-2 text-orange-500" />
              <span className="text-gray-500 ml-2">{fileName || ' '}</span>
            </div>

            {/* Nút chọn file */}
            <label className="cursor-pointer border border-orange-500 px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition h-10 flex items-center">
              Chọn tệp tải lên...
              <input type="file" {...register('attachment')} className="hidden" onChange={handleFileChange} />
            </label>
          </div>
        </div>

        <p className="text-sm lg:ml-[135px] text-gray-500 font-thin italic">Kích thước tệp không vượt quá 250MB.</p>

        {/* Button */}
        <div className="flex justify-center space-x-4 ">
          <button className="w-40 h-12 bg-gray-200 rounded-lg font-semibold">Hủy</button>
          <Button children="Thêm" className="secondary" size="mini" width="160px" height="48px" style={{ color: 'white', fontWeight: '600' }} />
        </div>
      </form>
    </div>
  );
};

export default StudentRetentionAdd;
