import { FC, MouseEventHandler, useState } from "react";
import { TItem, TTag } from "../../../types";
import { useSelector } from "react-redux";
import { selectTagById } from "../../tags/tagsSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import { removeItem } from "../itemsSlice";
import { Button } from "../../../components/button";
import { CloseIcon } from "../../../components/icons/close";
import { formatDate } from "../../../utils/date";

import s from "./style.module.css";

export type TItemProps = {
  item: TItem;
  disabled?: boolean;
  onClick: (item: TItem) => void;
};

export type TSubitemProps = {
  item: TItem;
};

export const Subitem: FC<TSubitemProps> = ({ item }) => {
  const tag = useSelector((state: RootState) => selectTagById(state, item.tag));

  return (
    <div className={s.Subitem}>
      <div className={s.Content}>
        <div className={s.Header}>
          <div className={s.Name}>
            <div className={s.Tag}>{tag?.name}</div>
            {item.text && <div className={s.Text}>{item.text}</div>}
          </div>

          <div className={s.Price}>{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export const Item: FC<TItemProps> = ({ item, disabled, onClick }) => {
  const tag = useSelector((state: RootState) =>
    selectTagById(state, item.tag)
  ) as TTag;

  console.log({ item, tag })

  const dispatch = useAppDispatch();

  const [isSubitemsOpen, setIsSubitemsOpen] = useState(false);

  const handleToggle: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsSubitemsOpen((prev) => !prev);
  };

  const handleRemove = (item: TItem) => {
    dispatch(removeItem(item));
  };

  const hasSubitems = item.subitems && item.subitems.length > 0;

  const SubitemsList = (
    <div className={s.Subitems}>
      {(item.subitems || []).map((subitem) => (
        <Subitem key={subitem.id} item={subitem} />
      ))}
    </div>
  );

  return (
    <div className={s.Item}>
      <div className={s.Wrapper}>
        <div className={s.Content}>
          <div className={s.Header} onClick={() => onClick(item)}>
            <div className={s.Name}>
              <div className={s.Tag}>{tag.name}</div>
              {item.text && (
                <div className={s.Text}>
                  <span>{item.text}</span>
                </div>
              )}
            </div>

            <div className={s.Price}>{item.price}</div>
          </div>

          {hasSubitems && isSubitemsOpen && SubitemsList}

          {hasSubitems && (
            <Button size="s" invert ghost onClick={handleToggle}>
              {isSubitemsOpen ? "Скрыть подтраты" : "Показать подтраты"}
            </Button>
          )}

          <div className={s.CreatedAt}>{formatDate(item.createdAt)}</div>
        </div>
        <div className={s.Actions}>
          <Button size="s" rect onClick={() => handleRemove(item)}>
            <CloseIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};
