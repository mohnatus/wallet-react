import { configureStore } from "@reduxjs/toolkit";
import itemsReducer from "../features/items/itemsSlice";
import tagsSlice from "../features/tags/tagsSlice";
import periodsSlice from "../features/periods/periodsSlice";
import notifierSlice from "../features/notifier/notifierSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    items: itemsReducer,
    tags: tagsSlice,
    periods: periodsSlice,
    notifier: notifierSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
