import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu của state trong slice `auth`
interface AuthState {
  isAuthenticated: boolean; // Xác định xem người dùng có đang đăng nhập hay không
  user: { id: string; name: string } | null; // Thông tin người dùng (null nếu chưa đăng nhập)
  token: string | null; // Token xác thực (null nếu chưa có)
}

// Giá trị mặc định của state
const initialState: AuthState = {
  isAuthenticated: false, // Ban đầu người dùng chưa đăng nhập
  user: null, // Không có thông tin người dùng
  token: null, // Không có token
};

// Tạo slice `authSlice`
const authSlice = createSlice({
  name: 'auth', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Xử lý đăng nhập
    login: (
      state,
      action: PayloadAction<{ user: { id: string; name: string }; token: string }>
    ) => {
      state.isAuthenticated = true; // Đặt trạng thái đăng nhập thành true
      state.user = action.payload.user; // Lưu thông tin người dùng
      state.token = action.payload.token; // Lưu token xác thực
    },
    // Reducer: Xử lý đăng xuất
    logout: (state) => {
      state.isAuthenticated = false; // Đặt trạng thái đăng nhập thành false
      state.user = null; // Xóa thông tin người dùng
      state.token = null; // Xóa token
    },
    // Reducer: Cập nhật thông tin người dùng
    setUser: (state, action: PayloadAction<{ user: { id: string; name: string } }>) => {
      state.user = action.payload.user; // Cập nhật thông tin người dùng
    },
  },
});

// Xuất các action để sử dụng ở nơi khác
export const { login, logout, setUser } = authSlice.actions;

// Export reducer để cấu hình trong store
export default authSlice.reducer;