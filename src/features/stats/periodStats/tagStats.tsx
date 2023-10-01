import { FC, useState } from "react";
import { TStatsItem, TTag, TTagStats } from "../../../types";
import { formatDate } from "../../../utils/date";

import s from "./style.module.css";
import { Button } from "../../../components/button";

export type TTagStatsProps = {
  tag: TTag;
  items: TStatsItem[];
  total: number;
  active: boolean;
  onToggle: (tagId: number) => void;
};

export const TagStats: FC<TTagStatsProps> = ({
  tag,
  items,
  total,
  active,
  onToggle,
}) => {
  const [opened, setOpened] = useState(false);

  const handleToggle = () => {
    setOpened((prev) => !prev);
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => onToggle(tag.id)}
          />
        </td>
        <td className={active ? "" : s.Inactive}>
          <b>{tag.name}</b>
        </td>
        <td align="right">
          <b>{active ? total : ""}</b>
        </td>
        <td align="right">{active ? items.length : ""}</td>
      </tr>
      {active && (
        <tr>
          <td colSpan={4}>
            <Button size="s" invert onClick={handleToggle}>
              {opened ? "Скрыть список" : "Показать список"}
            </Button>

            {opened && (
              <div className={s.Subitems}>
                {items.map((item) => (
                  <div key={item.id}>
                    {formatDate(item.createdAt)} - {item.total}{" "}
                    {item.text && <span>({item.text})</span>}
                  </div>
                ))}
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
};
