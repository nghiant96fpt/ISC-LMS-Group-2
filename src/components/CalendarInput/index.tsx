import React, { useState } from 'react';
import './style.css';
import iconColendar from './icons/icon-calendar.png';
import iconShapeRight from './icons/shape-right.png';
import iconShapeLeft from './icons/shape-left.png';

const CalendarInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  // Lấy số ngày trong tháng
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Ngày hiển thị trong lịch
  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInCurrentMonth = getDaysInMonth(currentYear, currentMonth);

    // Ngày của tháng trước
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    const prevMonthDaysToShow = [];
    for (let i = daysInPrevMonth - firstDayOfMonth + 1; i <= daysInPrevMonth; i++) {
      prevMonthDaysToShow.push(new Date(prevYear, prevMonth, i));
    }

    // Ngày của tháng hiện tại
    const currentMonthDays = [];
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      currentMonthDays.push(new Date(currentYear, currentMonth, i));
    }

    const totalDays = prevMonthDaysToShow.length + currentMonthDays.length;
    const remainder = totalDays % 7;
    const daysToAddFromNextMonth = remainder === 0 ? 0 : 7 - remainder;

    // Ngày của tháng sau
    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    const nextMonthDays = [];
    for (let i = 1; i <= daysToAddFromNextMonth; i++) {
      nextMonthDays.push(new Date(nextYear, nextMonth, i));
    }

    return [...prevMonthDaysToShow, ...currentMonthDays, ...nextMonthDays];
  };

  const days = getCalendarDays();

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const formattedDateVN = (date: Date) => {
    return date.toLocaleDateString('vi-VN');
  };

  const handleDateChoose = () => {
    if (selectedDate) {
      setIsCalendarOpen(false);
      console.log(`Ngày đã chọn: ${formattedDateVN(selectedDate)}`);
    } else {
      alert('Vui lòng chọn ngày trước khi xác nhận.');
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      <div className="calendar-input-container">
        <input
          type="text"
          value={selectedDate ? selectedDate.toLocaleDateString('vi-VN') : ''}
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          readOnly
          placeholder="Chọn ngày"
          className="calendar-input"
        />
        <img src={iconColendar} className="calendar-icon" onClick={() => setIsCalendarOpen(!isCalendarOpen)} alt="calendar icon" />
      </div>

      {/* Popup */}
      {isCalendarOpen && (
        <div className={`calendar-popup ${isCalendarOpen ? 'open' : ''}`}>
          <div className="calendar-header">
            <button className="calendar-nav-button" onClick={handlePrevMonth}>
              <img src={iconShapeLeft} alt="Previous Month" />
            </button>
            <span className="calendar-title">
              Tháng {currentMonth + 1}, {currentYear}
            </span>
            <button className="calendar-nav-button" onClick={handleNextMonth}>
              <img src={iconShapeRight} alt="Next Month" />
            </button>
          </div>

          <div className="calendar-weekdays">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>

          <div className="calendar-grid">
            {days.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`calendar-day ${
                  selectedDate?.toDateString() === date.toDateString() ? 'selected' : date.getMonth() !== currentMonth ? 'other-month' : ''
                }`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>

          <div className="calendar-footer">
            <button className="calendar-choose-button" onClick={handleDateChoose}>
              Chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
