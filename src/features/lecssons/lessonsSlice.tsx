import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho một bài học (Lesson)
interface Lesson {
  id: string; // Mã định danh duy nhất cho bài học
  title: string; // Tiêu đề của bài học
  courseId: string; // ID của khóa học mà bài học thuộc về
  content: string; // Nội dung của bài học
}

// Định nghĩa trạng thái cho slice `lessons`
interface LessonsState {
  lessons: Lesson[]; // Danh sách các bài học
  loading: boolean; // Trạng thái tải dữ liệu (true: đang tải, false: không tải)
}

// Trạng thái khởi tạo
const initialState: LessonsState = {
  lessons: [], // Danh sách bài học ban đầu là mảng rỗng
  loading: false, // Không tải dữ liệu khi khởi tạo
};

// Tạo slice `lessonsSlice`
const lessonsSlice = createSlice({
  name: 'lessons', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Bắt đầu tải danh sách bài học
    fetchLessonsStart: (state) => {
      state.loading = true; // Đặt trạng thái loading = true
    },
    // Reducer: Tải danh sách bài học thành công
    fetchLessonsSuccess: (state, action: PayloadAction<Lesson[]>) => {
      state.loading = false; // Kết thúc trạng thái tải
      state.lessons = action.payload; // Cập nhật danh sách bài học từ action.payload
    },
    // Reducer: Xử lý lỗi khi tải danh sách bài học
    fetchLessonsFailure: (state) => {
      state.loading = false; // Kết thúc trạng thái tải (dù thất bại)
    },
    // Reducer: Thêm một bài học mới
    addLesson: (state, action: PayloadAction<Lesson>) => {
      state.lessons.push(action.payload); // Thêm bài học mới vào cuối danh sách
    },
    // Reducer: Xóa một bài học khỏi danh sách
    deleteLesson: (state, action: PayloadAction<string>) => {
      state.lessons = state.lessons.filter(
        (lesson) => lesson.id !== action.payload, // Loại bỏ bài học có id khớp với action.payload
      );
    },
  },
});

// Xuất các action để sử dụng trong ứng dụng
export const { fetchLessonsStart, fetchLessonsSuccess, fetchLessonsFailure, addLesson, deleteLesson } = lessonsSlice.actions;

// Xuất reducer mặc định để tích hợp vào store
export default lessonsSlice.reducer;