import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const API_URL = 'https://fivefood.shop/api/education-levels';

// Định nghĩa kiểu dữ liệu cho trình độ đào tạo
interface TrainingLevel {
  name: string;
  trainingType: string;
  isAnnualSystem: boolean;
  trainingDuration?: number;
  semesterPerYear?: number;
  isCredit: boolean;
  mandatoryCourse?: number;
  electiveCourse?: number;
  status: boolean;
  description?: string;
}

// Kiểu dữ liệu của state
interface TrainingLevelState {
  TrainingLevelManagement: TrainingLevel[];
  loading: boolean;
  error: string | null;
}

// Khởi tạo state ban đầu
const initialState: TrainingLevelState = {
  TrainingLevelManagement: [],
  loading: false,
  error: null,
};

// Thunk lấy danh sách trình độ đào tạo
export const fetchTrainingLevels = createAsyncThunk(
  'trainingLevelManagement/fetchTrainingLevels',
  async ({ page, pageSize, sortColumn, sortOrder }: { page: number; pageSize: number; sortColumn: string; sortOrder: string }) => {
    const response = await fetch(`${API_URL}?page=${page}&pageSize=${pageSize}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    // console.log('check data', data);

    return data;
  },
);

// Thunk thêm mới trình độ đào tạo
export const postTrainingLevel = createAsyncThunk('trainingLevelManagement/postTrainingLevel', async (newTrainingLevel: TrainingLevel) => {
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
  return data as TrainingLevel; // Đảm bảo trả về đúng kiểu
});

// xóa
export const deleteTrainingLevel = createAsyncThunk('trainingLevelManagement/deleteTrainingLevel', async (id: string) => {
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

const trainingLevelSlice = createSlice({
  name: 'trainingLevelManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingLevels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrainingLevels.fulfilled, (state, action: PayloadAction<TrainingLevel[]>) => {
        state.loading = false;
        state.TrainingLevelManagement = action.payload;
      })
      .addCase(fetchTrainingLevels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi xảy ra!';
      })
      .addCase(postTrainingLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postTrainingLevel.fulfilled, (state, action: PayloadAction<TrainingLevel>) => {
        state.loading = false;
        state.TrainingLevelManagement.push(action.payload); // Đảm bảo action.payload là TrainingLevel
      })
      .addCase(postTrainingLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi thêm mới!';
      })
      .addCase(deleteTrainingLevel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTrainingLevel.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.TrainingLevelManagement = state.TrainingLevelManagement.filter((trainingLevel) => trainingLevel.name !== action.payload);
      })
      .addCase(deleteTrainingLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Có lỗi khi xóa!';
      });
  },
});

export default trainingLevelSlice.reducer;
