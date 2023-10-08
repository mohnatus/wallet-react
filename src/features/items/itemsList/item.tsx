import { FC } from "react";
import { TItem } from "../../../types";
import { useSelector } from "react-redux";
import { selectTagById } from "../../tags/tagsSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import { removeItem } from "../itemsSlice";
import { Button } from "../../../components/button";

import s from "./style.module.css";
import { CloseIcon } from "../../../components/icons/close";
import { PencilIcon } from "../../../components/icons/pencil";

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
          <div className={s.Tag}>{tag?.name}</div>
          <div className={s.Price}>{item.price}</div>
        </div>

        {item.text && <div className={s.Text}>{item.text}</div>}
      </div>
    </div>
  );
};

export const Item: FC<TItemProps> = ({ item, disabled, onClick }) => {
  const tag = useSelector((state: RootState) => selectTagById(state, item.tag));

  const dispatch = useAppDispatch();

  const handleRemove = (item: TItem) => {
    dispatch(removeItem(item));
  };

  return (
    <div className={s.Item}>
      <div className={s.Wrapper}>
        <div className={s.Content}>
          <div className={s.Header}>
            <div className={s.Progress}>
              <div className={s.Tag}>{tag?.name}</div>
              <div className={s.Price}>{item.price}</div>
            </div>
          </div>

          {item.text && <div className={s.Text}>{item.text}</div>}

          {item.subitems && item.subitems.length > 0 && (
            <div className={s.Subitems}>
              {item.subitems.map((subitem) => (
                <Subitem key={subitem.id} item={subitem} />
              ))}
            </div>
          )}
        </div>
        <div className={s.Actions}>
          <Button size="s" rect onClick={() => handleRemove(item)}>
            <CloseIcon width={16} height={16} />
          </Button>

          {!disabled && (
            <Button rect size="s" onClick={() => onClick(item)}>
              <PencilIcon width={16} height={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
