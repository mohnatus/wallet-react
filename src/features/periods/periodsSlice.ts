import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { TInterval, TNewPeriodData, TPeriod } from "../../types";
import { Progress } from "../../constants/progress";
import { addPeriodToDb, removePeriodFromDb } from "../../db";
import { RootState } from "../../store/store";

const periodsAdapter = createEntityAdapter<TPeriod>({
  sortComparer: (a, b) => a.id - b.id,
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
      const periods = [...action.payload];

      if (!periods.length || periods[0].createdAt !== null) {
        periods.unshift({
          id: 0,
          createdAt: null,
          name: "Начальный период",
        });
      }

      periodsAdapter.setAll(state, periods);
      state.status = Progress.success;

      const lastPeriod = periods[periods.length - 1];

      state.activePeriod = lastPeriod;
      state.lastId = lastPeriod.id;
    },
    addPeriod(state, action: PayloadAction<TNewPeriodData>) {
      state.lastId = state.lastId + 1;
      const period: TPeriod = {
        id: state.lastId,
        createdAt: +new Date(),
        ...action.payload,
      };
      periodsAdapter.addOne(state, period);
      addPeriodToDb(period);
      state.activePeriod = period;
    },
    removePeriod(state, action: PayloadAction<TPeriod>) {
      periodsAdapter.removeOne(state, action.payload.id);
      removePeriodFromDb(action.payload);
    },
    setActivePeriod(state, action: PayloadAction<TPeriod>) {
      state.activePeriod = action.payload;
    },
  },
});

export default periodsSlice.reducer;

export const { setPeriods, addPeriod, removePeriod, setActivePeriod } =
  periodsSlice.actions;

export const {
  selectAll: selectAllPeriods,
  selectById: selectPeriodById,
  selectIds: selectPeriodsIds,
} = periodsAdapter.getSelectors((state: RootState) => state.periods);

export const selectActivePeriod = (state: RootState) =>
  state.periods.activePeriod;

export const selectLastPeriodId = createSelector(
  [selectAllPeriods],
  (periods) => periods[periods.length - 1]?.id
);

export const selectActiveInterval = createSelector(
  [selectAllPeriods, selectActivePeriod],
  (periods, activePeriod) => {
    if (!activePeriod) return [null, null] as TInterval;
    const index = periods.findIndex((p) => p.id === activePeriod.id);
    const nextPeriod = periods[index + 1];
    return [activePeriod.createdAt, nextPeriod?.createdAt || null] as TInterval;
  }
);

export const selectPeriodInterval = createSelector(
  [selectAllPeriods, (state, period?: TPeriod | null) => period],
  (periods, period) => {
    if (!period) return [null, null] as TInterval;
    const index = periods.findIndex((p) => p.id === period.id);
    if (index === -1) return [null, null] as TInterval;
    const nextPeriod = periods[index + 1];
    return [period.createdAt, nextPeriod?.createdAt || null] as TInterval;
  }
);
