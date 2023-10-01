import { FC, useEffect, useState } from "react";
import { TItem, TPeriod, TTag } from "../../../types";
import { useSelector } from "react-redux";
import { selectPeriodInterval } from "../../periods/periodsSlice";
import { RootState } from "../../../store/store";
import { selectItemsInInterval } from "../../items/itemsSlice";
import { selectAllTags } from "../../tags/tagsSlice";
import { getStats } from "../../../utils/stats";

import s from "./style.module.css";
import { TagStats } from "./tagStats";
import { getDiff } from "../../../utils/date";
import { formatInterval } from "../../../utils/intervals";

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

  const [inactive, setInactive] = useState<Record<string, boolean>>({});

  const handleToggle = (tagId: number) => {
    setInactive((prev) => ({
      ...prev,
      [tagId]: !prev[tagId],
    }));
  };

  const stats = getStats(items);

  const sortedTags = tags.map((tag) => {
    const tagItems = stats[tag.id] || [];
    tagItems.sort((a, b) => a.createdAt - b.createdAt);
    return {
      tag,
      items: tagItems,
      total: tagItems.reduce((total, item) => total + item.total, 0),
    };
  });

  sortedTags.sort((a, b) => b.total - a.total);

  const activeTags = sortedTags.filter((tag) => !inactive[tag.tag.id]);
  const inactiveTags = sortedTags.filter((tag) => inactive[tag.tag.id]);

  const total = activeTags.reduce((total, tag) => total + tag.total, 0);
  const count = activeTags.reduce((count, tag) => count + tag.items.length, 0);

  return (
    <div>
      <div>{formatInterval(interval)}</div>
      <div>
        {interval[1] && "Период завершен"}
        {!interval[0] && !interval[1] && "У текущего периода нет границ"}
      </div>
      <div>
        {interval[0] &&
          `Длительность периода - ${getDiff(interval[0], interval[1])} дней`}
      </div>
      <table className={s.Table}>
        <thead>
          <tr>
            <th></th>
            <th align="left">Тег</th>
            <th align="right">Сумма</th>
            <th align="right">Кол-во</th>
          </tr>
          <tr>
            <th></th>
            <th align="left">ИТОГО</th>
            <th align="right">{total}</th>
            <th align="right">{count}</th>
          </tr>
        </thead>
        <tbody>
          {activeTags.map((tagStats) => (
            <TagStats
              key={tagStats.tag.id}
              tag={tagStats.tag}
              items={tagStats.items}
              total={tagStats.total}
              active={!inactive[tagStats.tag.id]}
              onToggle={handleToggle}
            />
          ))}
          {inactiveTags.map((tagStats) => (
            <TagStats
              key={tagStats.tag.id}
              tag={tagStats.tag}
              items={tagStats.items}
              total={tagStats.total}
              active={!inactive[tagStats.tag.id]}
              onToggle={handleToggle}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
