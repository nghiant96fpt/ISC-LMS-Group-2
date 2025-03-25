import { combineReducers, configureStore } from '@reduxjs/toolkit';
import trainingLevelReducer from './reducers/trainingLevelManagement';
const rootStore = combineReducers({
  trainingLevelManagement: trainingLevelReducer,
});

const store = configureStore({
  reducer: rootStore,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
