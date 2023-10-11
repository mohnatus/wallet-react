import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { TItem, TNewItemData, TInterval } from "../../types";
import { Progress } from "../../constants/progress";
import { addItemToDb, removeItemFromDb, updateItemInDb } from "../../db";
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
      const items = action.payload;
      itemsAdapter.setAll(state, items);
      state.status = Progress.success;
      const lastId = items.reduce((max, item) => {
        const { id, subitems = [] } = item;
        return Math.max(id, ...subitems.map((subitem) => subitem.id));
      }, 0);
      if (items.length) state.lastId = lastId;
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
    updateItem(
      state,
      action: PayloadAction<{ item: TItem; data: TNewItemData }>
    ) {
      const { item, data } = action.payload;
      const { subitems = [], ...fields } = data;

      const createdAt = item.createdAt;

      const updatedItem: TItem = {
        ...item,
        ...fields,
        subitems: subitems.map((subitemData) => {
          state.lastId = state.lastId + 1;

          const subitem: TItem = {
            id: state.lastId,
            createdAt,
            text: subitemData.text,
            price: subitemData.price,
            tag: subitemData.tag,
          };

          return subitem;
        }),
      };

      itemsAdapter.updateOne(state, {
        id: item.id,
        changes: updatedItem,
      });

      updateItemInDb(updatedItem);
    },
    removeItem(state, action: PayloadAction<TItem>) {
      itemsAdapter.removeOne(state, action.payload.id);
      removeItemFromDb(action.payload);
    },
  },
});

export default itemsSlice.reducer;

export const { setItems, addItem, updateItem, removeItem } = itemsSlice.actions;

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
  (items: TItem[], activePeriod) => {
    const [from, to] = activePeriod;

    return items.filter((item) => {
      if (from && item.createdAt < from) return false;
      if (to && item.createdAt >= to) return false;
      return true;
    });
  }
);

export const selectActiveFlatItems = createSelector([selectActiveItems], (items) => {
  const result: TItem[] = [];
  items.forEach((item) => {
    result.push(item);
    result.push(...(item.subitems || []));
  });
  return result;
});

export const selectActiveItemsByTag = createSelector(
  [selectActiveFlatItems, (state: RootState, tagId: number) => tagId],
  (items, tagId) => items.filter((item) => item.tag === tagId)
);

export const selectItemsInInterval = createSelector(
  [selectAllItems, (state: RootState, interval: TInterval) => interval],
  (items: TItem[], interval: TInterval) => {
    const [from, to] = interval;

    return items.filter((item) => {
      if (from && item.createdAt < from) return false;
      if (to && item.createdAt >= to) return false;
      return true;
    });
  }
);