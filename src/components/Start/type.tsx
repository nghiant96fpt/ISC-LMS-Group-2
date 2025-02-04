/**
 * Props cho component Star
 * 
 * @property {boolean} selected - Chỉ định ngôi sao có được chọn hay không.
 * @property {Function} toggleSelect - Hàm callback để thay đổi trạng thái chọn của ngôi sao.
 */
export interface StarProps {
  /** 
   * Trạng thái cho biết ngôi sao có được chọn hay không. 
   * Giá trị này sẽ xác định xem ngôi sao có hình ảnh được chọn hay không.
   */
  selected: boolean;

  /** 
   * Hàm callback để thay đổi trạng thái chọn của ngôi sao. 
   * Hàm này sẽ được gọi khi người dùng nhấp vào ngôi sao.
   */
  toggleSelect: () => void;
}