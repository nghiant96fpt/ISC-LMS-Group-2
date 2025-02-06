/**
 * Cấu hình cho SwitchTag
 * @property labels - Danh sách nhãn hiển thị trên tab
 * @property defaultActiveTab - Chỉ mục của tab mặc định (không bắt buộc)
 */
export interface SwitchTagOptions {
  readonly labels: string[];
  defaultActiveTab?: number;
}

/**
 * Props cho component SwitchTag
 * @property options - Đối tượng chứa thông tin cấu hình
 * @property activeTab - Chỉ mục tab đang active (nhận từ bên ngoài)
 * @property handleTabClick - Hàm callback khi tab được click
 */
export interface SwitchTagProps {
  options: SwitchTagOptions;
  activeTab: number;
  handleTabClick: (id: number) => void;
}
