import { FC } from "react";
import { TItem, TPeriod, TTag } from "../../../types";
import { useSelector } from "react-redux";
import { selectPeriodInterval } from "../../periods/periodsSlice";
import { RootState } from "../../../store/store";
import { selectItemsInInterval } from "../../items/itemsSlice";
import { selectAllTags } from "../../tags/tagsSlice";
import { getStats } from "../../../utils/stats";

import s from './style.module.css'
import { formatDate } from "../../../utils/date";

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

  console.log({ sortedTags })

  return <div>
    <table className={s.Table}>
        <thead>
            <tr>
                <th>Тег</th>
                <th>Итого</th>
                <th>Кол-во</th>
                <th>Траты</th>
            </tr>
        </thead>
        <tbody>
            {sortedTags.map(tagStats => <tr key={tagStats.tag.id}>
                <td>
                    {tagStats.tag.name}
                </td>
                <td>
                    {tagStats.total}
                </td>
                <td>
                    {tagStats.items.length}
                </td>
                <td>
                    {tagStats.items.map(item => <div key={item.id}>
                        {formatDate(item.createdAt)} - {item.total} ({item.text})
                    </div>)}
                </td>
            </tr>)}
        </tbody>
    </table>
  </div>;
};
