import { FC } from "react";
import { TItem, TPeriod, TTag } from "../../../types";
import { useSelector } from "react-redux";
import { selectPeriodInterval } from "../../periods/periodsSlice";
import { RootState } from "../../../store/store";
import { selectItemsInInterval } from "../../items/itemsSlice";
import { selectAllTags } from "../../tags/tagsSlice";
import { getStats } from "../../../utils/stats";

import s from "./style.module.css";
import { TagStats } from "./tagStats";

export type TPeriodStatsProps = {
  period?: TPeriod | null;
};

export const PeriodStats: FC<TPeriodStatsProps> = ({ period }) => {
  const interval = useSelector((state: RootState) =>
    selectPeriodInterval(state, period)
  );
  const items = useSelector((state: RootState) =>
    selectItemsInInterval(state, interval)
  );
  const tags = useSelector(selectAllTags);

  const stats = getStats(items);

  const sortedTags = tags.map((tag) => {
    const tagItems = stats[tag.id] || [];
    return {
      tag,
      items: tagItems,
      total: tagItems.reduce((total, item) => total + item.total, 0),
    };
  });

  sortedTags.sort((a, b) => b.total - a.total);

  return (
    <div>
      <table className={s.Table}>
        <thead>
          <tr>
            <th align="left">Тег</th>
            <th align="right">Итого</th>
            <th align="right">Кол-во</th>
          </tr>
        </thead>
        <tbody>
          {sortedTags.map((tagStats) => (
            <TagStats
              key={tagStats.tag.id}
              tag={tagStats.tag}
              items={tagStats.items}
              total={tagStats.total}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
