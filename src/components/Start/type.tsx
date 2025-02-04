/**
 * Props cho component Star.
 */
export interface StarProps {
  /** Trạng thái của ngôi sao (đã chọn hoặc chưa chọn). */
  selected: boolean;

  /** Hàm xử lý chọn/bỏ chọn ngôi sao. */
  toggleSelect: () => void;
}