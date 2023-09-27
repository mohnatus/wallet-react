import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { NotificationStatuses, TNotification } from "../../types";
import { RootState } from "../../store/store";

const initialState: { items: TNotification[]; lastId: number } = {
  items: [],
  lastId: 0,
};

export const notifierSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    addMessage(
      state,
      action: PayloadAction<{ text: string; status?: NotificationStatuses }>
    ) {
      const { text, status = NotificationStatuses.info } = action.payload;
      state.lastId = state.lastId + 1;
      state.items.push({
        id: state.lastId,
        text,
        status,
      });
    },
    removeMessage(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export default notifierSlice.reducer;

export const { addMessage, removeMessage } = notifierSlice.actions;


export const addNotification = createAsyncThunk<void, { text: string, status?: NotificationStatuses }>(
  "notifier/addNotification",
  async ({ text, status }, thunkApi) => {
    await thunkApi.dispatch(
      addMessage({ text, status: status || NotificationStatuses.info })
    );
    const {
      notifier: { lastId },
    } = thunkApi.getState() as RootState;
    setTimeout(() => {
      thunkApi.dispatch(removeMessage(lastId));
    }, 3000);
  }
);

export const selectNotifications = (state: RootState) => state.notifier.items;
