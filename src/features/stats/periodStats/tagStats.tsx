import { FC } from "react";
import { TStatsItem, TTag, TTagStats } from "../../../types";
import { formatDate } from "../../../utils/date";

export type TTagStatsProps = {
  tag: TTag;
  items: TStatsItem[];
  total: number;
};

export const TagStats: FC<TTagStatsProps> = ({ tag, items, total }) => {
  return (
    <>
      <tr>
        <td>{tag.name}</td>
        <td align="right">{total}</td>
        <td align="right">{items.length}</td>
      </tr>
      <tr>
        <td colSpan={3}>
          {items.map((item) => (
            <div key={item.id}>
              {formatDate(item.createdAt)} - {item.total} ({item.text})
            </div>
          ))}
        </td>
      </tr>
    </>
  );
};
