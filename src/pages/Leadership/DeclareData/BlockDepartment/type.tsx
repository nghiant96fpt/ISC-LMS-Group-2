export interface ModalProps {
  title: string; // Tiêu đề của modal
  code: string; // Mã khoa - khối
  faculty: string; // Tên khoa - khối
  headOfFaculty: string; // Trưởng khoa - khối đang được chọn
  facultyOptions: string[]; // Danh sách trưởng khoa - khối để hiển thị trong select
  onClose: () => void; // Hàm xử lý khi nhấn nút "Hủy"
  onSave: () => void; // Hàm xử lý khi nhấn nút "Lưu"
}
