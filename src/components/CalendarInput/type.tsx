/*
<CalendarInput
  selectedDate={selectedDate}
  onDateChange={handleDateChange}
  handleDateChoose={handleDateChoose} 
/>;
*/
export interface CalendarInputProps {
  placeholder?: string;
  onDateChange?: (date: Date | null) => void; // fc  khi người dùng chọn ngày
  onMonthChange?: (month: number, year: number) => void; // fc gọi khi chuyển tháng
  onToggleCalendar?: (isOpen: boolean) => void; // fc  khi mở/đóng lịch
  handleDateChoose?: () => void; // fc  khi nhấn nút "Chọn"
  selectedDate?: Date | null; // Ngày được chọn hiện tại
  initialDate?: Date;
  locale?: string;
  dayNames?: string[];
  style?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
  popupStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  selectedDayStyle?: React.CSSProperties;
  otherMonthDayStyle?: React.CSSProperties;
}
