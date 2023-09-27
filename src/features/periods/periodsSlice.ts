import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
  Selector,
} from "@reduxjs/toolkit";
import { TInterval, TPeriod } from "../../types";
import { Progress } from "../../constants/progress";
import { addPeriodToDb, removePeriodFromDb } from "../../db";
import { RootState } from "../../store/store";

const periodsAdapter = createEntityAdapter<TPeriod>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = periodsAdapter.getInitialState({
  status: Progress.idle,
  activePeriod: null as TPeriod | null,
  lastId: 9,
});

export const periodsSlice = createSlice({
  name: "periods",
  initialState,
  reducers: {
    setPeriods(state, action: PayloadAction<TPeriod[]>) {
      const periods = action.payload;
      periodsAdapter.setAll(state, periods);
      state.status = Progress.success;
      if (periods.length) {
        state.activePeriod = periods[0] || null;
        state.lastId = periods[periods.length - 1].id;
      }
    },
    addPeriod(state) {
      state.lastId = state.lastId + 1;
      const period: TPeriod = {
        id: state.lastId,
        createdAt: +new Date(),
      };
      periodsAdapter.addOne(state, period);
      addPeriodToDb(period);
    },
    removePeriod(state, action: PayloadAction<TPeriod>) {
      periodsAdapter.removeOne(state, action.payload.id);
      removePeriodFromDb(action.payload);
    },
  },
});

export default periodsSlice.reducer;

export const { setPeriods, addPeriod, removePeriod } = periodsSlice.actions;

export const {
  selectAll: selectAllPeriods,
  selectById: selectPeriodById,
  selectIds: selectPeriodsIds,
} = periodsAdapter.getSelectors((state: RootState) => state.periods);

export const selectActivePeriod = (state: RootState) =>
  state.periods.activePeriod;

export const selectActiveInterval = createSelector(
  [selectAllPeriods, selectActivePeriod],
  (periods, activePeriod) => {
    if (!activePeriod) return [null, null];
    const index = periods.findIndex((p) => p.id === activePeriod.id);
    const nextPeriod = periods[index + 1];
    return [activePeriod.createdAt, nextPeriod?.createdAt || null] as TInterval;
  }
);
