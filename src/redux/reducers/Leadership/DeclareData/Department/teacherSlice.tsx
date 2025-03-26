import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeacherListAPI } from '../../../../../services/Leadership/DeclareData/Department/teacherService';
import { deleteTeacher } from './teacherThunks';
import { Teacher, TeacherResponse } from './type';

export const fetchTeacherList = createAsyncThunk(
  'teacher/fetchTeacherList',
  async ({ page, pageSize, search }: { page: number; pageSize: number; search?: string }, { rejectWithValue }) => {
    try {
      const response: TeacherResponse = await fetchTeacherListAPI(page, pageSize, 'Id', 'asc', search || '');
      console.log(response);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Lỗi khi lấy danh sách giáo viên');
    }
  },
);

interface TeacherState {
  teachers: Teacher[] | null;
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const initialState: TeacherState = {
  teachers: null,
  loading: false,
  error: null,
  page: 1,
  pageSize: 8,
  totalItems: 0,
  totalPages: 1,
};

const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeacherList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherList.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Redux Reducer - action.payload:', action.payload); // Xem payload
        state.teachers = action.payload.data || [];
        state.page = action.payload.page ?? 1;
        state.pageSize = action.payload.pageSize ?? 8;
        state.totalItems = action.payload.totalItems ?? 0;
        state.totalPages = action.payload.totalPages ?? 1;
      })

      .addCase(fetchTeacherList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = (state.teachers ?? []).filter((teacher) => teacher.id !== action.payload);
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi không xác định';
      });
  },
});

export default teacherSlice.reducer;
