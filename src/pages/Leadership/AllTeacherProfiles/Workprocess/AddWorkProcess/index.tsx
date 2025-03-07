import React, { useState } from 'react';
import { workHistoryData } from '../data';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import iconCalendar from '../../../../../assets/icons/icon-calendar.png';
import { subjectGroups as initialSubjectGroups } from '../../../DeclareData/DataList/data';
import minus from '../../../../../assets/icons/icon_minus.png';
import plus from '../../../../../assets/icons/icon_plus.png';
import caretdown from '../../../../../assets/icons/caret_down.png';
import Input from '../../../../../components/Input';

import { CustomDropdownProps } from '../../../../../components/DropdownSelection/type';
import CheckboxComponent from '../../../../../components/CheckBox';
import { SubjectGroup } from '../../../DeclareData/DataList/type';

import { DropdownOption } from '../../../../../components/Dropdown/type';
import { options } from '../../../TrainingInfo/AddTraining/data';
import Button from '../../../../../components/Button';
dayjs.extend(customParseFormat);
const AddWorkProcess: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Lựa chọn',
  width = '100%',

  onSelect,
  className = '',
}) => {
  const [selectedUnit, setSelectedUnit] = useState('');
  const [subjectGroups] = useState<SubjectGroup[]>(initialSubjectGroups);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [trainingPrograms, setTrainingPrograms] = useState<DropdownOption[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);

    onSelect && onSelect(e.target.value);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option: DropdownOption) => {
    setTrainingPrograms([...trainingPrograms, option]);
    setIsDropdownOpen(false);
  };
  const removeProgram = (index: number, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setTrainingPrograms(trainingPrograms.filter((_, i) => i !== index));
  };
  const WorkProcess = Array.from(new Set(workHistoryData.map((item) => item.unit)));
  const Role = Array.from(new Set(workHistoryData.map((item) => item.role)));
  const subjectGroup = Array.from(new Set(subjectGroups.map((item) => item.name)));
  return (
    <div className="flex justify-center items-center min-h-screen p-10">
      <div className="bg-white rounded-2xl p-6 w-full max-w-[884px] shadow-lg">
        <form className="w-full pt-3 px-6 md:px-[60px] pb-10">
          <h2 className="text-black-text text-center text-2xl font-bold mb-5">Thêm mới quá trình công tác</h2>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Giảng viên:</label>
            <Input style={{ width: '700px' }} size="md" type="text" placeholder="Trịnh Trần Phương Tuấn" disabled />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Cơ quan/Đơn vị: <span className="text-orange-text">*</span>
            </label>

            <div style={{ width }} className={`relative ${className}`}>
              {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
              <div className="relative">
                {/* Select Box */}
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={selectedUnit}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                  {WorkProcess.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="pl-36">
            <CheckboxComponent label="Đang làm việc tại đơn vị này" isChecked={false} onChange={(e) => console.log(e.target.checked)} />
          </div>
          <div className=" pt-3 flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Tổ/Bộ môn: <span className="text-orange-text">*</span>
            </label>

            <div style={{ width }} className={`relative ${className}`}>
              {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
              <div className="relative">
                {/* Select Box */}
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={selectedUnit}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                  {subjectGroup.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className=" pt-3 flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Chức vụ: <span className="text-orange-text">*</span>
            </label>

            <div style={{ width }} className={`relative ${className}`}>
              {label && <label className="block mb-1 text-sm font-medium">{label}</label>}
              <div className="relative">
                {/* Select Box */}
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 pr-8"
                  value={selectedUnit}
                  onChange={handleChange}
                >
                  <option value="" disabled hidden>
                    {placeholder}
                  </option>
                  {Role.map((name, index) => (
                    <option key={index} value={name}>
                      {name}
                    </option>
                  ))}
                </select>

                <img src={caretdown} alt="Dropdown" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none" />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Ngày bắt đầu: <span className="text-orange-text">*</span>
            </label>
            <DatePicker
              className="appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={startDate}
              onChange={(newDate) => {
                setStartDate(newDate);
                setOpenStart(false);
              }}
              format={(value) => value.format('D/M/YYYY')}
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={openStart}
              onOpenChange={(status) => setOpenStart(status)}
              suffixIcon={
                <img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpenStart(!openStart)} />
              }
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpenStart(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">
              Ngày kết thúc: <span className="text-orange-text">*</span>
            </label>

            <DatePicker
              className="appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={endDate}
              onChange={(newDate) => {
                setEndDate(newDate);
                setOpenEnd(false);
              }}
              format={(value) => value.format('D/M/YYYY')}
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={openEnd}
              onOpenChange={(status) => setOpenEnd(status)}
              suffixIcon={
                <img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpenEnd(!openEnd)} />
              }
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpenEnd(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <hr className="my-6 border-gray-300" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {trainingPrograms.map((program, index) => (
              <div key={index} className="flex">
                <button onClick={(e) => removeProgram(index, e)} className="text-red-500">
                  <img src={minus} alt="Remove" className="w-6 h-6" />
                </button>
                <span className="flex-grow ml-3">{program.label}</span>
              </div>
            ))}
          </div>
          <div className="relative pt-3">
            <div className="text-blue-500 cursor-pointer font-bold flex items-center" onClick={toggleDropdown}>
              <img src={plus} alt="" className="w-6 h-6 inline-block" />
              <span className="ml-2">Thêm chương trình đào tạo</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-48">
                {options.map((option) => (
                  <div key={option.value} className="p-2 hover:bg-gray-200 cursor-pointer" onClick={() => handleOptionSelect(option)}>
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>{' '}
          <div className="flex justify-center mt-4">
            <Button className="secondary" style={{ color: '#000', margin: 2, marginRight: 20, fontWeight: 'bold' }}>
              Hủy
            </Button>

            <Button className="primary" style={{ margin: 2, marginLeft: 20, fontWeight: 'bold' }}>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkProcess;
