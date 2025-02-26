import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import iconCalendar from '../../../src/assets/icons/icon-calendar.png';
import './style.css';

dayjs.extend(customParseFormat);

const CalendarInput: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <DatePicker
      className="w-[200px] h-[40px] rounded-[6px] border border-gray-500 hover:border-orange-500 shadow-md"
      value={date}
      onChange={(date) => {
        setDate(date);
        setOpen(false);
      }}
      format={(value) => value.format('D/M/YYYY')}
      locale={locale}
      placeholder="DD/MM/YYYY"
      open={open}
      onOpenChange={(status) => setOpen(status)}
      suffixIcon={
        <img className="w-[22px] h-[25px] border-gray-500  cursor-pointer" src={iconCalendar} alt="calendar icon" onClick={() => setOpen(!open)} />
      }
      dropdownClassName="custom-datepicker"
      renderExtraFooter={() => (
        <button
          className="bg-orange-500 ml-24 text-white px-6 mb-2 rounded-md  font-semibold hover:bg-orange-600 transition"
          onClick={() => setOpen(false)}
        >
          Chọn
        </button>
      )}
    />
  );
};

export default CalendarInput;
