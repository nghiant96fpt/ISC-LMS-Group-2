import React, { useState } from 'react';
import Dropdown from '../../../components/Dropdown';
import CalendarInput from '../../../components/CalendarInput';
const edit = require('../../../assets/icons/fi_edit.png');

const UpdateModel: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  return (
    <>
      {isShow && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" w-full max-w-2xl md:max-w-3xl lg:max-w-4xl bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h1 className="text-2xl font-bold mb-4"> </h1>
            <h3 className="text-gray-700 mb-8 text-xl font-bold">Cập nhật lịch giảng dạy </h3>
            <div className="p-3">
              <div className="flex w-full">
                <p className="w-full lg:w-2/6 font-bold text-left ">Giảng viên:</p>
                <p className="w-full lg:w-4/6 text-left">Giảng viên</p>
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left">Môn học:</p>
                <p className="w-full lg:w-4/6 text-left">Toán đại số</p>
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left">Môn học:</p>
                <div className="w-full lg:w-4/6 text-left">
                  <Dropdown handleOptionClick={() => {}} onSelect={() => {}} options={[{ label: 'Bánh cđ', value: 'hdhhd' }]} selectedOption={null} />
                </div>
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left">Ngày bắt đầu:</p>
                <div className="w-full lg:w-4/6 text-left">
                  <CalendarInput />
                </div>
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left"> Ngày kết thúc:</p>
                <div className="w-full lg:w-4/6 text-left">
                  <CalendarInput />
                </div>
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left">Mô tả:</p>
                <textarea className="w-full lg:w-4/6 text-left" />
              </div>
              <div className="flex w-full mt-4">
                <p className="w-full lg:w-2/6 font-bold text-left"> </p>
                <div className="w-full lg:w-4/6 text-left flex   space-x-10">
                  <button
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                    className="bg-gray-100 text-black-text font-semibold py-3 px-14 rounded-lg"
                  >
                    Huỷ
                  </button>
                  <button
                    onClick={() => {
                      setIsShow(!isShow);
                    }}
                    className="bg-background-orange-1 text-white font-semibold py-3 px-10 rounded-lg"
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <img
        onClick={() => {
          setIsShow(!isShow);
        }}
        src={edit}
        alt="Edit"
        className="w-5 h-5 md:w-6 md:h-6 object-contain"
      />
    </>
  );
};

export default UpdateModel;
