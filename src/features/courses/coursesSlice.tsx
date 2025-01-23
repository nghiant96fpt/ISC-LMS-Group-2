import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho một khóa học (Course)
interface Course {
  id: string; // Mã định danh duy nhất cho khóa học
  title: string; // Tiêu đề của khóa học
  description: string; // Mô tả chi tiết về khóa học
}

// Định nghĩa trạng thái cho slice `courses`
interface CoursesState {
  courses: Course[]; // Danh sách các khóa học
  loading: boolean; // Trạng thái tải dữ liệu (true: đang tải, false: không tải)
}

// Trạng thái khởi tạo
const initialState: CoursesState = {
  courses: [], // Danh sách khóa học ban đầu là mảng rỗng
  loading: false, // Không tải dữ liệu khi khởi tạo
};

// Tạo slice `coursesSlice`
const coursesSlice = createSlice({
  name: 'courses', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Bắt đầu tải danh sách khóa học
    fetchCoursesStart: (state) => {
      state.loading = true; // Đặt trạng thái loading = true
    },
    // Reducer: Tải danh sách khóa học thành công
    fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
      state.loading = false; // Kết thúc trạng thái tải
      state.courses = action.payload; // Cập nhật danh sách khóa học từ action.payload
    },
    // Reducer: Xử lý lỗi khi tải danh sách khóa học
    fetchCoursesFailure: (state) => {
      state.loading = false; // Kết thúc trạng thái tải (dù thất bại)
    },
    // Reducer: Thêm một khóa học mới
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload); // Thêm khóa học mới vào cuối danh sách
    },
    // Reducer: Xóa một khóa học khỏi danh sách
    deleteCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload, // Loại bỏ khóa học có id khớp với action.payload
      );
    },
  },
});

// Xuất các action để sử dụng trong ứng dụng
export const { fetchCoursesStart, fetchCoursesSuccess, fetchCoursesFailure, addCourse, deleteCourse } = coursesSlice.actions;

// Xuất reducer mặc định để tích hợp vào store
export default coursesSlice.reducer;