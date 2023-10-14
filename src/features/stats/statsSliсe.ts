import { createSelector } from "reselect";
import { selectAllTags } from "../tags/tagsSlice";
import { selectActiveItems, selectFlatItems } from "../items/itemsSlice";
import { selectIntervals } from "../periods/periodsSlice";
import { TInterval, TItem, TPeriod } from "../../types";

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

export const selectItemsByIntervals = createSelector(
  [selectFlatItems, selectIntervals],
  (items, intervals) => {
    const result: Array<{
      period: TPeriod,
      interval: TInterval,
      items: TItem[]
    }> = [];

    intervals.forEach((period) => {
      const [from, to] = period.interval;
      const intervalItems = items.filter((item) => {
        if (from) {
          if (item.createdAt < from) return false;
        }
        if (to) {
          if (item.createdAt >= to) return false;
        }
        return true;
      });
      result.push({
        ...period,
        items: intervalItems,
      });
    });

    return result;
  }
);
