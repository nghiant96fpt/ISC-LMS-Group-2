import { combineReducers, configureStore } from '@reduxjs/toolkit';
import trainingLevelReducer from './reducers/trainingLevelManagement';
import teacherReducer from './reducers/Leadership/DeclareData/Department/teacherSlice';

const rootStore = combineReducers({
  teacher: teacherReducer,
  trainingLevelManagement: trainingLevelReducer,
});

const store = configureStore({
  reducer: rootStore,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
