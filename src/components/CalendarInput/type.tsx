export interface CalendarInputProps {
  placeholder?: string;
  onDateChange?: (date: Date | null) => void;
  onMonthChange?: (month: number, year: number) => void;
  onToggleCalendar?: (isOpen: boolean) => void;
  handleDateChoose?: () => void;
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
