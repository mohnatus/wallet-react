import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { TItem, TNewItemData } from "../../types";
import { Progress } from "../../constants/progress";
import { addItemToDb, removeItemFromDb } from "../../db";
import { RootState } from "../../store/store";
import { selectActiveInterval } from "../periods/periodsSlice";

const itemsAdapter = createEntityAdapter<TItem>({
  sortComparer: (a, b) => b.id - a.id,
});

const initialState = itemsAdapter.getInitialState({
  status: Progress.idle,
  lastId: 0,
});

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<TItem[]>) {
      console.log({ action });
      const items = action.payload;
      itemsAdapter.setAll(state, items);
      state.status = Progress.success;
      if (items.length) state.lastId = items[items.length - 1].id;
    },
    addItem(state, action: PayloadAction<TNewItemData>) {
      state.lastId = state.lastId + 1;
      const createdAt = +new Date();

      const { subitems, ...itemData } = action.payload;

      const itemSubitemsList: TItem[] = subitems
        ? subitems.map((subitemData) => {
            state.lastId = state.lastId + 1;

            const subitem: TItem = {
              id: state.lastId,
              createdAt,
              text: subitemData.text,
              price: subitemData.price,
              tag: subitemData.tag,
            };

            return subitem;
          })
        : [];

      const item: TItem = {
        id: state.lastId,
        createdAt,
        ...itemData,
        subitems: itemSubitemsList,
      };
      itemsAdapter.addOne(state, item);
      addItemToDb(item);
    },
    removeItem(state, action: PayloadAction<TItem>) {
      itemsAdapter.removeOne(state, action.payload.id);
      removeItemFromDb(action.payload);
    },
  },
});

export default itemsSlice.reducer;

export const { setItems, addItem, removeItem } = itemsSlice.actions;

export const {
  selectAll: selectAllItems,
  selectById: selectItemById,
  selectIds: selectItemsIds,
} = itemsAdapter.getSelectors((state: RootState) => state.items);

export const selectFlatItems = createSelector([selectAllItems], (items) => {
  const result: TItem[] = [];
  items.forEach((item) => {
    result.push(item);
    result.push(...(item.subitems || []));
  });
  return result;
});

export const selectItemsByTag = createSelector(
  [selectFlatItems, (state: RootState, tagId: number) => tagId],
  (items, tagId) => items.filter((item) => item.tag === tagId)
);

export const selectActiveItems = createSelector(
  [selectAllItems, selectActiveInterval],
  (items, activePeriod) => {
    const [from, to] = activePeriod;

    return items.filter((item) => {
      if (from && item.createdAt < from) return false;
      if (to && item.createdAt >= to) return false;
      return true;
    });
  }
);
