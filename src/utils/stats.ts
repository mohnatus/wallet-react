import { TItem, TStats, TStatsItem } from "../types";

export function getStats(items: TItem[]) {
  let stats: TStats = {};

  function addItem(tag: number, itemData: TStatsItem) {
    if (!stats[tag]) stats[tag] = [];
    stats[tag].push(itemData);
  }

  items.forEach((item) => {
    const {
      id: itemId,
      text: itemText,
      price: itemPrice,
      createdAt: itemCreatedAt,
      tag: itemTag,
      subitems = [],
    } = item;

    const subitemsTotal = subitems.reduce(
      (total, subitem) => total + subitem.price,
      0
    );

    addItem(itemTag, {
      id: itemId,
      text: itemText,
      createdAt: itemCreatedAt,
      total: itemPrice - subitemsTotal,
    });

    subitems.forEach((subitem) => {
      const {
        id: subitemId,
        text: subitemText,
        price: subitemPrice,
        createdAt: subitemCreatedAt,
        tag: subitemTag,
      } = subitem;

      addItem(subitemTag, {
        id: subitemId,
        text: subitemText,
        createdAt: subitemCreatedAt,
        total: subitemPrice,
      });
    });
  });

  return stats;
}
