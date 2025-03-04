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
import { Link } from 'react-router';
import Input from '../../../../../components/Input';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import { CustomDropdownProps } from '../../../../../components/DropdownSelection/type';
import { IconArrowCaretDown } from '../../../../../components/Icons';
import CheckboxComponent from '../../../../../components/CheckBox';
import { SubjectGroup } from '../../../DeclareData/DataList/type';
import CalendarInput from '../../../../../components/CalendarInput';
dayjs.extend(customParseFormat);
const AddWorkProcess: React.FC<CustomDropdownProps> = ({
  label,
  placeholder = 'Lựa chọn',
  width = '100%',
  options = [],
  onSelect,
  className = '',
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>(initialSubjectGroups);
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [open, setOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnit(e.target.value);
    setSelectedValue(e.target.value);
    onSelect && onSelect(e.target.value);
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
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Cơ quan/Đơn vị:</label>

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
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Tổ/Bộ môn:</label>

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
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Chức vụ:</label>

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
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Ngày bắt đầu:</label>

            <DatePicker
              className=" appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
                setOpen(false);
              }}
              format={(value) => value.format('D/M/YYYY')}
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={open}
              onOpenChange={(status) => setOpen(status)}
              suffixIcon={<img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpen(!open)} />}
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4">
            <label className="md:w-3/12 w-full text-black-text font-bold text-base mb-2 md:mb-0">Ngày kết thúc:</label>

            <DatePicker
              className=" appearance-none w-full h-11 border border-gray-300 rounded-lg hover:border-orange-500 shadow-md px-3"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
                setOpen(false);
              }}
              format={(value) => value.format('D/M/YYYY')}
              locale={locale}
              placeholder="DD/MM/YYYY"
              open={open}
              onOpenChange={(status) => setOpen(status)}
              suffixIcon={<img className="w-[22px] h-[25px] cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpen(!open)} />}
              dropdownClassName="custom-datepicker"
              renderExtraFooter={() => (
                <button
                  className="bg-orange-500 text-white px-6 mb-2 rounded-md font-semibold hover:bg-orange-600 transition"
                  onClick={() => setOpen(false)}
                >
                  Chọn
                </button>
              )}
            />
          </div>
          <hr className="my-6 border-gray-300" />

          <div className="flex flex-col items-start w-full">
            <Link to="/leadership/declare-data/subject-list">
              <button className="mt-1 text-blue-text font-bold flex items-center">
                <img src={plus} alt="Add" className="w-5 mr-2" /> Thêm đơn vị công tác
              </button>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <Link to="/leadership/declare-data">
              <button className="w-full md:w-40 h-12 py-2 bg-[#F2F2F2] text-black-text font-bold rounded-lg">Hủy</button>
            </Link>

            <button type="submit" className="w-full md:w-40 py-2 bg-orange-text text-white font-bold rounded-lg">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWorkProcess;
