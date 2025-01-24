import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho một đối tượng người dùng
interface User {
  id: string; // Mã định danh duy nhất
  name: string; // Tên người dùng
  email: string; // Email của người dùng
  role: string; // Vai trò của người dùng (admin, user, ...)
}

// Định nghĩa trạng thái cho slice `users`
interface UsersState {
  users: User[]; // Danh sách người dùng
  loading: boolean; // Trạng thái tải dữ liệu (true: đang tải, false: không tải)
}

// Trạng thái khởi tạo
const initialState: UsersState = {
  users: [], // Danh sách người dùng ban đầu là mảng rỗng
  loading: false, // Không tải dữ liệu khi khởi tạo
};

// Tạo slice `usersSlice`
const usersSlice = createSlice({
  name: 'users', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Bắt đầu tải danh sách người dùng
    fetchUsersStart: (state) => {
      state.loading = true; // Đặt trạng thái loading = true
    },
    // Reducer: Tải danh sách người dùng thành công
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.loading = false; // Kết thúc trạng thái tải
      state.users = action.payload; // Cập nhật danh sách người dùng
    },
    // Reducer: Xử lý lỗi khi tải danh sách người dùng
    fetchUsersFailure: (state) => {
      state.loading = false; // Kết thúc trạng thái tải (dù thất bại)
    },
    // Reducer: Thêm một người dùng mới vào danh sách
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); // Thêm người dùng mới vào cuối mảng
    },
    // Reducer: Xóa một người dùng khỏi danh sách
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        (user) => user.id !== action.payload, // Loại bỏ người dùng có id khớp với action.payload
      );
    },
  },
});

// Xuất các action để sử dụng trong ứng dụng
export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure, addUser, deleteUser } = usersSlice.actions;

// Xuất reducer mặc định để tích hợp vào store
export default usersSlice.reducer;