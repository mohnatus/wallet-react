import { FC } from "react";
import { TStatsItem, TTag, TTagStats } from "../../../types";
import { formatDate } from "../../../utils/date";

import s from './style.module.css'

export type TTagStatsProps = {
  tag: TTag;
  items: TStatsItem[];
  total: number;
  active: boolean;
  onToggle: (tagId: number) => void;
};

export const TagStats: FC<TTagStatsProps> = ({ tag, items, total, active, onToggle }) => {
  return (
    <>
      <tr>
        <td>
          <input type="checkbox" checked={active} onChange={e => onToggle(tag.id)} />
        </td>
        <td className={active ? '' : s.Inactive}>{tag.name}</td>
        <td align="right">{ active ? total : ''}</td>
        <td align="right">{ active ? items.length : ''}</td>
      </tr>
      {active && <tr>
        <td colSpan={4}>
          {items.map((item) => (
            <div key={item.id}>
              {formatDate(item.createdAt)} - {item.total} ({item.text})
            </div>
          ))}
        </td>
      </tr>}
    </>
  );
};
