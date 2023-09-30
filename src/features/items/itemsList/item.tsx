import { FC } from "react";
import { TItem } from "../../../types";
import { useSelector } from "react-redux";
import { selectTagById } from "../../tags/tagsSlice";
import { RootState, useAppDispatch } from "../../../store/store";
import { removeItem } from "../itemsSlice";
import { Button } from "../../../components/button";

import s from "./style.module.css";

export type TItemProps = {
  item: TItem;
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
          <div>
            <div className={s.Text}>{item.text}</div>
            <div className={s.Tag}>#{tag?.name}</div>
          </div>
          <div className={s.Price}>{item.price}</div>
        </div>
      </div>
    </div>
  );
};

export const Item: FC<TItemProps> = ({ item, onClick }) => {
  const tag = useSelector((state: RootState) => selectTagById(state, item.tag));

  const dispatch = useAppDispatch();

  const handleRemove = (item: TItem) => {
    dispatch(removeItem(item));
  };

  return (
    <div className={s.Item}>
      <div className={s.Wrapper}>
        <div className={s.Content}>
          <div className={s.Header} onClick={() => onClick(item)}>
            <div>
              <div className={s.Text}>{item.text}</div>
              <div className={s.Tag}>#{tag?.name}</div>
            </div>
            <div className={s.Price}>{item.price}</div>
          </div>

          {item.subitems && item.subitems.length > 0 && (
            <div className={s.Subitems}>
              <div className={s.SubitemsHeader}>Подтраты:</div>

              {item.subitems.map((subitem) => (
                <Subitem key={subitem.id} item={subitem} />
              ))}
            </div>
          )}
        </div>
        <div className={s.Close}>
          <Button onClick={() => handleRemove(item)}>&times;</Button>
        </div>
      </div>
    </div>
  );
};
