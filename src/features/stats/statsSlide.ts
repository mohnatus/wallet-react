import { createSelector } from "reselect";
import { selectAllTags } from "../tags/tagsSlice";
import { selectActiveItems } from "../items/itemsSlice";

export const selectLimits = createSelector([selectAllTags], (tags) => {
  const limits: Record<number, number> = {};
  tags.forEach((tag) => {
    limits[tag.id] = 0;
  });
  return limits;
});

export const selectTotal = createSelector(
  [selectAllTags, selectActiveItems],
  (tags, items) => {
    const total: Record<number, number> = {};
    tags.forEach((tag) => {
      total[tag.id] = 0;
    });

    items.forEach((item) => {
      const { tag, price, subitems = [] } = item;

      let subitemsPrice = 0;

      subitems.forEach((subitem) => {
        subitemsPrice += subitem.price;
        total[subitem.tag] += subitem.price;
      });

      total[tag] += price - subitemsPrice;
    });

    return total;
  }
);
