import React, { useState } from 'react';
import './style.css';

const CalendarInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Tính ngày trong tháng
  const getDaysInMonth = (year: number, month: number) => {
    return new Array(31)
      .fill(null)
      .map((_, index) => new Date(year, month, index + 1))
      .filter((date) => date.getMonth() === month);
  };

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const days = getDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // setIsCalendarOpen(false);
  };
  const handleDateChoose = () => {
    if (selectedDate) {
      setIsCalendarOpen(false);
    } else {
      alert('Vui lòng chọn ngày trước khi xác nhận.');
    }
  };
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      // Chuyển về tháng 12 năm trước
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      // Chuyển về tháng 1 năm sau
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className="calendar-container">
      {/* Input field */}
      <input
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString('vi-VN') : ''}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        readOnly
        placeholder="Chọn ngày"
        className="calendar-input"
      />

      {/* Calendar popup */}
      {isCalendarOpen && (
        <div className="calendar-popup">
          {/* Điều hướng tháng */}
          {/* Điều hướng tháng */}
          <div className="calendar-header">
            <button className="calendar-nav-button" onClick={handlePrevMonth}>
              {'<'}
            </button>
            <span className="calendar-title">
              Tháng {currentMonth + 1}, {currentYear}
            </span>
            <button className="calendar-nav-button" onClick={handleNextMonth}>
              {'>'}
            </button>
          </div>

          {/* Hiển thị tên các ngày trong tuần */}
          <div className="calendar-weekdays">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
              <div key={index} className="calendar-weekday">
                {day}
              </div>
            ))}
          </div>
          {/* Danh sách ngày */}
          <div className="calendar-grid">
            {days.map((date, index) => (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`calendar-day ${selectedDate?.toDateString() === date.toDateString() ? 'selected' : ''}`}
              >
                {date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
