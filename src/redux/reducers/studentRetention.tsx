import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://fivefood.shop/api/reserves';

interface StudentRetention {
  id: number;
  code: string;
  fullName: string;
  studentId: number;
  className: string;
  dob: string;
  gender: string;
  reserveDate: string;
  retentionPeriod: string;
  reason: string;
  file: string | undefined | any;
  semester: string;
  classId: number;
  semesterId: number;
  leadershipId: number;
}

// Kiểu dữ liệu của state
interface StudentRetentionState {
  StudentRetention: StudentRetention[];
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: StudentRetentionState = {
  StudentRetention: [],
  loading: false,
  error: null,
};

export const fetchStudentRetention = createAsyncThunk(
  'studentRetention/fetchStudentRetention',
  async ({ page, pageSize, sortColumn, sortOrder }: { page: number; pageSize: number; sortColumn: string; sortOrder: string }) => {
    const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // console.log('check data', data);

    return data.data as StudentRetention[];
  },
);

export const fetchOneStudentRetention = createAsyncThunk('studentRetention/fetchOneStudentRetention', async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch student retention: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data as StudentRetention; // Đảm bảo kiểu dữ liệu trả về đúng
});

// thêm mới
export const postStudentRetention = createAsyncThunk('studentRetention/postStudentRetention', async (newTrainingLevel: StudentRetention) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTrainingLevel),
  });

  if (!response.ok) {
    throw new Error(`Failed to create training level: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data as StudentRetention; // Đảm bảo trả về đúng kiểu
});

// xóa
export const deleteStudentRetention = createAsyncThunk('studentRetention/deleteStudentRetention', async (id: string) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete training level: ${response.status} ${response.statusText}`);
  }

  return id; // Trả về ID để reducer có thể cập nhật state
});

const studentRetention = createSlice({
  name: 'studentRetention',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention[]>) => {
        state.loading = false;
        state.StudentRetention = action.payload;
      })
      .addCase(fetchStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(fetchOneStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOneStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention>) => {
        state.loading = false;
        state.StudentRetention = [action.payload];
      })
      .addCase(fetchOneStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi lấy dữ liệu!';
      })
      .addCase(postStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postStudentRetention.fulfilled, (state, action: PayloadAction<StudentRetention>) => {
        state.loading = false;
        state.StudentRetention.push(action.payload); // Đảm bảo action.payload là TrainingLevel
      })
      .addCase(postStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi thêm mới!';
      })
      .addCase(deleteStudentRetention.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStudentRetention.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.StudentRetention = state.StudentRetention.filter((StudentRetention) => StudentRetention.fullName !== action.payload);
      })
      .addCase(deleteStudentRetention.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi xóa!';
      });
  },
});

export default studentRetention.reducer;
