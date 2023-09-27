import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../../store/store";
import { TItem } from "../../../types";
import { FC } from "react";
import { removeItem } from "../itemsSlice";
import { selectTagById } from "../../tags/tagsSlice";

export type TItemProps = {
  item: TItem;
};

export type TItemsListProps = {
  items: TItem[];
};

export const Item: FC<TItemProps> = ({ item }) => {
  const tag = useSelector((state: RootState) => selectTagById(state, item.tag));

  const dispatch = useAppDispatch();

  const handleRemove = (item: TItem) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <span>{item.text}</span>
      <span>{item.price}</span>
      <span>{tag?.name}</span>
      <button type="button" onClick={() => handleRemove(item)}>
        &times;
      </button>
    </div>
  );
};

export const ItemsList: FC<TItemsListProps> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};
