import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTeacherListAPI } from '../../../../../services/Leadership/DeclareData/Department/teacherService';
import { deleteTeacher } from './teacherThunks';

export const fetchTeacherList = createAsyncThunk('teacher/fetchTeacherList', async ({ page, pageSize }: { page: number; pageSize: number }) => {
  const data = await fetchTeacherListAPI(page, pageSize);
  return data;
});

interface TeacherState {
  teachers: any[];
  loading: boolean;
  error: string | null;
}

const initialState: TeacherState = {
  teachers: [],
  loading: false,
  error: null,
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
        state.teachers = action.payload;
        state.loading = false;
      })
      .addCase(fetchTeacherList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi không xác định';
      })
      .addCase(deleteTeacher.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.teachers = state.teachers.filter((teacher) => teacher.id !== action.payload); // ✅
      })
      .addCase(deleteTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Lỗi không xác định';
      });
  },
});

export default teacherSlice.reducer;
