import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";
import { TNewTagData, TTag } from "../../types";
import { Progress } from "../../constants/progress";
import { addTagToDb, removeTagFromDb, updateTagInDb } from "../../db";
import { RootState } from "../../store/store";
import { selectFlatItems } from "../items/itemsSlice";

const tagsAdapter = createEntityAdapter<TTag>();

const initialState = tagsAdapter.getInitialState({
  status: Progress.idle,
  lastId: 0,
});

export const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {
    setTags(state, action: PayloadAction<TTag[]>) {
      const tags = action.payload;
      tagsAdapter.setAll(state, tags);
      state.status = Progress.success;
      if (tags.length) {
        state.lastId = tags[tags.length - 1].id;
      }
    },
    addTag(state, action: PayloadAction<TNewTagData>) {
      state.lastId = state.lastId + 1;
      const tag: TTag = {
        id: state.lastId,
        createdAt: +new Date(),
        ...action.payload,
      };
      tagsAdapter.addOne(state, tag);
      addTagToDb(tag);
    },
    updateTag(state, action: PayloadAction<{ tag: TTag; data: TNewTagData }>) {
      const { tag, data } = action.payload;
      const updatedTag: TTag = {
        ...tag,
        ...data,
      };
      tagsAdapter.updateOne(state, { id: tag.id, changes: updatedTag });

      updateTagInDb(updatedTag);
    },
    removeTag(state, action: PayloadAction<TTag>) {
      tagsAdapter.removeOne(state, action.payload.id);
      removeTagFromDb(action.payload);
    },
  },
});

export default tagsSlice.reducer;

export const { setTags, addTag, updateTag, removeTag } = tagsSlice.actions;

export const {
  selectAll: selectAllTags,
  selectById: selectTagById,
  selectIds: selectTagsIds,
} = tagsAdapter.getSelectors((state: RootState) => state.tags);

export const selectTagsWeight = createSelector(
  [selectAllTags, selectFlatItems],
  (tags, items) => {
    const weight: Record<number, number> = {};
    tags.forEach((tag) => {
      weight[tag.id] = 0;
    });
    items.forEach((item) => {
      weight[item.tag] += 1;
    });
    return weight;
  }
);

export const selectWeightedTags = createSelector(
  [selectAllTags, selectTagsWeight],
  (tags, weight) => {
    tags.sort((a, b) => weight[b.id] - weight[a.id]);
    return tags;
  }
);
