import { combineReducers, configureStore } from '@reduxjs/toolkit';
import teacherReducer from './reducers/Leadership/DeclareData/Department/teacherSlice';
const rootStore = combineReducers({
  teacher: teacherReducer,
});

const store = configureStore({
  reducer: rootStore,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
