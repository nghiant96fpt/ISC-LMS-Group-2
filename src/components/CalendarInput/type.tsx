export interface CalendarInputProps {
  placeholder?: string;
  onDateChange?: (date: Date | null) => void; // Hàm người dùng chọn ngày
  onMonthChange?: (month: number, year: number) => void; // Hàm chuyển tháng
  onToggleCalendar?: (isOpen: boolean) => void; // Hàm  mở/đóng lịch
  handleDateChoose?: () => void; // Hàm  nhấn nút "Chọn"
  selectedDate?: Date | null;
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
