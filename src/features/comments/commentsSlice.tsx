import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Định nghĩa kiểu dữ liệu cho một bình luận (Comment)
interface Comment {
  id: string; // Mã định danh duy nhất cho bình luận
  content: string; // Nội dung của bình luận
  userId: string; // ID người dùng đã tạo bình luận
  lessonId: string; // ID bài học mà bình luận thuộc về
}

// Định nghĩa trạng thái cho slice `comments`
interface CommentsState {
  comments: Comment[]; // Danh sách các bình luận
  loading: boolean; // Trạng thái tải dữ liệu (true: đang tải, false: không tải)
}

// Trạng thái khởi tạo
const initialState: CommentsState = {
  comments: [], // Danh sách bình luận ban đầu là mảng rỗng
  loading: false, // Không tải dữ liệu khi khởi tạo
};

// Tạo slice `commentsSlice`
const commentsSlice = createSlice({
  name: 'comments', // Tên của slice
  initialState, // Trạng thái khởi tạo
  reducers: {
    // Reducer: Bắt đầu tải danh sách bình luận
    fetchCommentsStart: (state) => {
      state.loading = true; // Đặt trạng thái loading = true
    },
    // Reducer: Tải danh sách bình luận thành công
    fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
      state.loading = false; // Kết thúc trạng thái tải
      state.comments = action.payload; // Cập nhật danh sách bình luận từ action.payload
    },
    // Reducer: Xử lý lỗi khi tải danh sách bình luận
    fetchCommentsFailure: (state) => {
      state.loading = false; // Kết thúc trạng thái tải (dù thất bại)
    },
    // Reducer: Thêm một bình luận mới
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload); // Thêm bình luận mới vào cuối danh sách
    },
    // Reducer: Xóa một bình luận khỏi danh sách
    deleteComment: (state, action: PayloadAction<string>) => {
      state.comments = state.comments.filter(
        (comment) => comment.id !== action.payload, // Loại bỏ bình luận có id khớp với action.payload
      );
    },
  },
});

// Xuất các action để sử dụng trong ứng dụng
export const { fetchCommentsStart, fetchCommentsSuccess, fetchCommentsFailure, addComment, deleteComment } = commentsSlice.actions;

// Xuất reducer mặc định để tích hợp vào store
export default commentsSlice.reducer;