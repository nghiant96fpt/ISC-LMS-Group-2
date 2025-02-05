export interface CalendarInputProps {
  placeholder?: string; //nội dung hiển thị ở ô input
  onDateChange?: (date: Date | null) => void; // Hàm người dùng chọn ngày
  onMonthChange?: (month: number, year: number) => void; // Hàm chuyển tháng
  onToggleCalendar?: (isOpen: boolean) => void; // Hàm  mở/đóng lịch
  handleDateChoose?: () => void; // Hàm  nhấn nút "Chọn"
  selectedDate?: Date | null; // ngày được chọn/có thể null
  initialDate?: Date; // Ngày mặc định ban đầu
  locale?: string; // Ngổn ngữ hieent thị (vd:vi-vn)
  dayNames?: string[]; // ds tên nagyf trong tuần: CN,T2,...T7

  // Các thuộc tính style cho giao diện
  style?: React.CSSProperties; // Style cho container chính
  inputStyle?: React.CSSProperties; // Style cho input
  popupStyle?: React.CSSProperties; // Style cho popup lịch
  buttonStyle?: React.CSSProperties; // Style cho nút mở lịch
  selectedDayStyle?: React.CSSProperties; // Style cho ngày được chọn
  otherMonthDayStyle?: React.CSSProperties; // Style cho ngày thuộc tháng khác
}
