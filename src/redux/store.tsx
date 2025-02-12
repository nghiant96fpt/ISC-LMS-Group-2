import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootStore = combineReducers(
    {
        // <tên reducer> : <reducer>
        // counter: counterReducer
    }
);

const store = configureStore({
    reducer: rootStore
});
export default store;