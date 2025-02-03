import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho một thông báo (Notification)
interface Notification {
  id: string; // Mã định danh duy nhất cho thông báo
  userId: string; // ID người dùng liên quan đến thông báo
  message: string; // Nội dung thông báo
  read: boolean; // Trạng thái đã đọc (true: đã đọc, false: chưa đọc)
}

// Định nghĩa trạng thái của slice `notifications`
interface NotificationsState {
  notifications: Notification[]; // Danh sách thông báo
  loading: boolean; // Trạng thái tải dữ liệu thông báo
}

// Trạng thái khởi tạo
const initialState: NotificationsState = {
  notifications: [], // Danh sách thông báo ban đầu là mảng rỗng
  loading: false, // Không tải dữ liệu khi khởi tạo
};

// Tạo slice `notificationsSlice`
const notificationsSlice = createSlice({
  name: 'notifications', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Bắt đầu tải danh sách thông báo
    fetchNotificationsStart: (state) => {
      state.loading = true; // Đặt trạng thái loading = true
    },
    // Reducer: Tải danh sách thông báo thành công
    fetchNotificationsSuccess: (state, action: PayloadAction<Notification[]>) => {
      state.loading = false; // Kết thúc trạng thái tải
      state.notifications = action.payload; // Cập nhật danh sách thông báo
    },
    // Reducer: Xử lý lỗi khi tải danh sách thông báo
    fetchNotificationsFailure: (state) => {
      state.loading = false; // Kết thúc trạng thái tải (dù thất bại)
    },
    // Reducer: Đánh dấu thông báo là đã đọc
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload, // Tìm thông báo có `id` khớp với action.payload
      );
      if (notification) {
        notification.read = true; // Đặt trạng thái `read = true`
      }
    },
    // Reducer: Thêm một thông báo mới
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.push(action.payload); // Thêm thông báo mới vào cuối danh sách
    },
  },
});

// Xuất các action để sử dụng trong ứng dụng
export const { fetchNotificationsStart, fetchNotificationsSuccess, fetchNotificationsFailure, markAsRead, addNotification } =
  notificationsSlice.actions;

// Xuất reducer mặc định để tích hợp vào store
export default notificationsSlice.reducer;